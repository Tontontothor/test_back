#Troubleshooting

Since the update of **mongo > 5.11** types are already includes in the package, but the **@types/mongoose** dependency is still linked. So, you have to **delete** this packages inside your node modules.

#Run prod server

1. Execute the command: **npm i**.

2. Download mongo from https://www.mongodb.com/try/download/community or use a docker image.

3. Start mongo and verify if it has really been started on the specified port, **27017** by default.

4. Execute the command: **npm start** to start the web server locally.

5. Now you can access it on the default **port 3000**, or you can specify one.

7. Once a day you have to start the script to actualize the database by running: **npm run start-script**.

-----------------
#Run otp script

1. Set your **NODE_ENV** variable like **dev, prod, test** which select the appropriate database

2. Run **npm start-script**

----
#Run migration script

1. Run **npm start-script-migrate {FROM_DATABASE_URL} {TO_DATABASE_URL}**
