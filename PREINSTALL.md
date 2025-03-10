<!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

# MongoDB Atlas Extension

This firebase extension is a v1 for MongoDB Atlas. It can perform the following operations

The data need to sent as POST request and as an JSON e.g 

```
# for /findOne
{
    "data": {"filter":{"name":"sample"}} 
}

# for /vectorSearch
{
    "data": {"query": "User query here"} 
}
```

    1. /findOne
        * requires user to pass filter in the format {"filter":{"name":"sample"}} 
    2. /insertOne
        * requires the user to pass document in JSON format.
    3. /vectorSearch
        * requires the user to pass the query in the format {"query": "Tell me about Firebase extensions"}

### The parameters that can be configures at the time of installation are below:
 * Connection String: The Mongodb SRV string from Atlas -> connect
 * Database Name: name of the database
 * Collection Name: Name of the collection you want to connect to.
 * Embedding Model Name
 * LLM Model Name
 * Index Name
 * Vector Index Name
 * Vector Field Name
 * Vector return Name

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
