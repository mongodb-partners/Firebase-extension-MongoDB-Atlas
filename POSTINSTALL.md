<!-- 
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/publishers/user-documentation#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-postinstall
-->

# See it in action

The extension will deploy a cloud function as backend deployed to perform findOne, insterOne and vectorSearch on MongoDB Atlas.

# Using the extension

To use this extesnion you need to import the trigger/https endpoint to your Application Logic. 
To use find one user /findOne at the end of the trigger
To use insert one user /insertOne at the end of the trigger
To use Atlas VectorSearch user /vectorSearch at the end of the trigger

To learn more about HTTP functions, visit the [functions documentation](https://firebase.google.com/docs/functions/http-events).

<!-- We recommend keeping the following section to explain how to monitor extensions with Firebase -->
# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
