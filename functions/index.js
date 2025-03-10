import { MongoClient } from 'mongodb';
import { initializeApp } from "firebase-admin/app";
import { https } from 'firebase-functions/v1';
import { VertexAIEmbeddings, ChatVertexAI } from "@langchain/google-vertexai";

import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";


const app = initializeApp();


export const mongodbcrud = https.onCall(async (data, context) => {
  const route = context.rawRequest.url;
  const payload = data;
  const client = new MongoClient(process.env.CONNECTION_STRING);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection(process.env.COLLECTION_NAME);

  const llm = new ChatVertexAI({
    model: process.env.LLM_MODEL_NAME,
    temperature: 0.2,
    maxRetries: 2,
    // For web, authOptions.credentials
    // authOptions: { ... }
    // other params...
  });
  const embeddings = new VertexAIEmbeddings({
    model: process.env.EMBEDDING_MODEL_NAME,
    location: process.env.LOCATION,
    // ...
  });

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection,
    indexName: process.env.INDEX_NAME, // The name of the Atlas search index. Defaults to "default"
    textKey: process.env.INDEX_FIELD, // The name of the collection field containing the raw content. Defaults to "text"
    embeddingKey: process.env.EMBEDDING_FIELD, // The name of the collection field containing the embedded text. Defaults to "embedding"
  });

  try {
    console.log('Connected successfully to MongoDB');
    console.log(route);
    if (route === "/findOne") {
        const filter = payload.filter || {};
        const projection = payload.projection || {};
        try{
          const result = {
            document: await collection.findOne(filter, projection)
            };
            return result;
        }
        finally{
          await client.close();
        }
    }

    else if(route === '/insertOne'){
      const document = payload.document || {};
      if (!document) {
        return res.status(400).send('Document is required');
      }
      const result = await collection.insertOne(document);
      console.log('Inserted document:', result.insertedId);
      return result["result"];
    }
    // else if(route === '/insertMany'){
    //   const documents = payload.documents || [];
    //   if (!documents.length) {
    //     return res.status(400).send('Documents are required');
    //   }

    //   collection.updateOne({ name: 'John Doe' }, { $set: { name: 'Jane Doe' } });
    // }
    else if(route === '/vectorSearch'){
      const query = payload.query || {};
      const filter = payload.filter || '';
      if (!query) {
        return 'Query is required';
      }
      try{
        // const singleVector = await embeddings.embedQuery(query);
        // console.log(singleVector);
        const similaritySearchResults = await vectorStore.similaritySearch(
          query,
          4,
          filter
        );
        const array_docs = [];
        for (let i=0; i< similaritySearchResults.length; i++) {
          array_docs.push(similaritySearchResults[i].pageContent);
        }
        const message = array_docs.join(" - ");

        const aiMsg = await llm.invoke([
          [
            "system",
            process.env.LLM_PROMPT,
          ],
          message,
        ]);
        return aiMsg.content;
      }
      finally{
        await client.close();
      }

    }
  }
  catch (error) {
// Handle the error here
    console.error(error);
  }
  finally{
    if(client){
        await client.close();
    }
  }
})