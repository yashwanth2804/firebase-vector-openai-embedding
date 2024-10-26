import { queryVector } from './firebaseUtils.js';
import { testReviews } from './reviews.js';

async function runRandomQuery() {
    const randomReview = testReviews[Math.floor(Math.random() * testReviews.length)];
    console.log("Random query:", randomReview);
    const results = await queryVector(randomReview);
    console.log("Similar reviews:");
    results.forEach((review, index) => {
        console.log(`${index + 1}. ${review}`);
    });
}

runRandomQuery();

