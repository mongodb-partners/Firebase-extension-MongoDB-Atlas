<!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

# MongoDB Atlas Extension

**Author**: MongoDB(https://accounts.mongodb.com).

**Description**: Query MongoDB Atlas using MongoDB vector search. Also perform the operations such as findone and insertone.

**Details**: Use this extension to connect to MongoDB Atlas and perform Vector Search.

## pre-requisites:
Before you install Firebase extension, 
1. The first step is to create a [MongoDB Atlas cluster on Google Cloud](https://www.mongodb.com/products/platform/atlas-cloud-providers/google-cloud). 
2. Configure IP [access list entries](https://www.mongodb.com/docs/atlas/security/ip-access-list/) and a [database user](https://www.mongodb.com/docs/atlas/security-add-mongodb-users/) for accessing the cluster using the connection string.
3. Get the [connection string](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/) for MongoDB.

With the initial release we are targeting the extension to perform operations such as findOne, insertOne and vectorSearch on the MongoDB. This doc will walk you through creating a MongoDB backend for connecting to MongoDB using Firebase extension. To learn more about how to integrate the deployed backend into Firebase application, see the official Firebase Documentation. 
The extension will create a Google Cloud function that can be triggered by user with a POST request to send and receive data to and from MongoDB Atlas.


## HTTPs request format
Here is the example of triggering the Google Cloud Function. The data need to sent as POST request body and as an raw JSON format.


### 1. findOne
To perform the findone on MongoDB Atlas, append the Cloud function trigger with */findOne* and in the body pass the data in below format.

```
{
    "data": {"filter":{"name":"Jane Doe"}} 
}
```

### 2. insertOne
To perform the insertone on MongoDB Atlas, append the Cloud function trigger with */insertOne* and in the body pass the data in below format.
```
{
    "data": {"document":{"name":"John Doe"}} 
}
```

### 3. vectorSearch
To perform the vector search on MongoDB Atlas, append the Cloud function trigger with */vectorSearch* and in the body pass the data in below format.
```
To perform /vectorSearch operation use
{
    "data": {"query": "User query here"} 
}
```
The extension will convert the query data into embeddings and pass to the aggregate query to perform Vector Search on MongoDB Atlas. 


### Quickstart
1. Installing the MongoDB Atlas Extension in Firebase:
   1. Open the [Firebase Extension Hub](https://extensions.dev/).
   2. Find and Select the MongoDB Atlas Extension or Use the search bar to find "MongoDB Atlas extension". 
   3. Click on the extension card. 
   4. Click the "Install" button. You will be redirected to the Firebase Console. 
2. On the Firebase console choose your Firebase Project where you want to install the extension. 
3. On the installation page 
   1. Review Billing and Usage. 
   2. Review API Endpoints. 
   3. Review the permissions granted to the function that will be created. 
   4. Configure the Extension: Provide the following configuration details:
      * MongoDB URI: The connection string for your MongoDB Atlas cluster. 
      * Database Name: The name of the database you want to use. 
      * Collection Name: The name of the collection you want to use. 
      * Vertex AI Embedding to use: The type of embedding model from Vertex AI. 
      * Vertex AI LLM model name: The name of the LLM model from Vertex AI. 
      * MongoDB Index Name: The name of the index in MongoDB. 
      * MongoDB Index Field: The field that the index is created upon. 
      * MongoDB Embedding Field: The field that contains the embedding vectors. 
      * LLM Prompt: The prompt that will be sent to the LLM.


<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- [Cloud Functions](https://cloud.google.com/functions/pricing-1stgen).
- [MongoDB Atlas billing](https://www.mongodb.com/pricing).

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
