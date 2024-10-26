import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure to set this in your .env file
});

async function getEmbeddings(text) {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        // The embeddings are in the 'data' array, we'll return the first (and only) one
        return response.data[0].embedding;
    } catch (error) {
        console.error('Error getting embeddings:', error);
        throw error;
    }
}

export { getEmbeddings };
