# Firebase Vector Search Demo

This project demonstrates vector search functionality using Firebase Firestore and OpenAI's text embeddings. It allows storing and querying vector embeddings for semantic similarity search.

### Youtube Video

[![YouTube](http://i.ytimg.com/vi/3u7u4mNbYZI/hqdefault.jpg)](https://www.youtube.com/watch?v=3u7u4mNbYZI)

## Features

- Generate text embeddings using OpenAI's API
- Store embeddings in Firebase Firestore
- Perform vector similarity search using Firestore's vector search capabilities
- Sample data for Amazon product reviews and general topics

## Prerequisites

- Node.js (v14 or later)
- Firebase project with Firestore enabled and collection name
- OpenAI API key

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/firebase-vector-demo.git
   cd firebase-vector-demo
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

   ```
   OPENAI_API_KEY=your_openai_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_COLLECTION=collection_name
   ```

4. Set up Firebase:
   - Download your Firebase service account key and save it as `serviceAccountKey.json` in the project root.

## Usage

1. Add sample data to Firestore:

   ```
   node addReviews.js
   ```

2. Create the composite index for vector search:
   Run the following command in your terminal:

   ```
   gcloud firestore indexes composite create --collection-group=reviews --query-scope=COLLECTION --field-config field-path=embedding,vector-config='{"dimension":"1536", "flat": "{}"}' --database="(default)"
   ```

   Note: This step is crucial for enabling vector search capabilities in Firestore. Make sure you have the Google Cloud SDK installed and configured for your project.
   [composite Index](https://firebase.google.com/docs/firestore/vector-search#gcloud)

3. Query the vector database:
   ```
   node queryReviews.js
   ```

## How it works

1. `getEmbeddings` in `openai.js` generates text embeddings using OpenAI's API.
2. `addVector` in `firebaseUtils.js` stores embeddings with original text in Firestore.
3. `queryVector` in `firebaseUtils.js` performs vector similarity search using Firestore's `findNearest`.

## Files

- `addReviews.js`: Script to add sample reviews to Firestore
- `queryReviews.js`: Script to perform vector similarity search
- `firebaseUtils.js`: Firebase initialization and utility functions
- `openai.js`: OpenAI API integration for generating embeddings
- `reviews.js`: Sample data for reviews and topics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
