import admin from 'firebase-admin';
import dotenv from 'dotenv';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };
import { getEmbeddings } from './openai.js';

dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

// Get Firestore instance
const db = admin.firestore();
const vectors_collection = db.collection(process.env.FIREBASE_COLLECTION);

// Function to add a new vector to the 'vectors' collection
async function addVector(review) {
    try {
        const _embedding = await getEmbeddings(review);
        const embeddingFieldValue = admin.firestore.FieldValue.vector(_embedding);
        const newVector = {
            embedding: embeddingFieldValue,
            review: review,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await vectors_collection.add(newVector);
        console.log('New vector added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding vector:', error);
    }
}

async function queryVector(query) {
    console.log("Query:", query);
    const _embedding = await getEmbeddings(query);
    const _embeddingFieldValue = admin.firestore.FieldValue.vector(_embedding);

    const knn = vectors_collection.findNearest({
        vectorField: "embedding",
        queryVector: _embeddingFieldValue,
        distanceMeasure: "COSINE",
        limit: 10,
        distanceThreshold: 0.7,
        distanceResultField: "vector_distance",
    });
    const result = await knn.get();
    return result.docs.map(doc => doc.data().review);
}

export { addVector, queryVector };

