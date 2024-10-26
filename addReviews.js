import { addVector } from './firebaseUtils.js';
import { reviews } from './reviews.js';

async function addAllReviews() {
    for (const review of reviews) {
        await addVector(review);
    }
    console.log('All reviews have been added to the database.');
}

addAllReviews();

