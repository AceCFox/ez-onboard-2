# ZEFNET EZ ONBOARDING

## Description
Duration: 1 Month Project

ZEFNET EZ ONBOARDING (ZEO) was worked on over the course of a month, and can be split into two parts: one week was spent planning and designing the application, while the last three weeks were spent building and testing the app. 

Our client ZEF Energy approached us to fix their "new client onboarding process" with one main problem - the ticket-based onboarding system for new customers. Their former system was very complex, and customers didn't always submit all the necessary information required for signup. This led to Zef Energy needing to have multiple interaction with clients that cost hundreds of dollars per client when signing up, creating a frustration experience for both the client and Zef. 

Our application ZEO fixed the above problems by creating a step by step experience for the client to follow and submit all the necessary information needed which we then collected and sent as an email to ZEF. Reducing the need for multiple interactions and creating a better experience for both parties.

To see the fully functional site, please visit: [Fully deployed aws application](https://onboard.zefenergy.com/)

### Prerequisites

- [VSCode](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [JavaScript]
- [React]

## Usage

- A new Zef customer will register an account wiht an email address, password, address, and optional phone number
- Then they will be guided to create an Organization with siilar information
- They will then be guided to a home screen where they can choose to either "Add a device" or "Add a User"
- Organization Information can also be viewed or edited by clicking ont he organization name in the top left corner

- On the "Add a Device" path they will be shown a screen that will prep them with all the info needed to add a device
- The client will then input the gathered info on the next four screens
- on the Host site page, they can either select any of their previously added sites or choose to open a modal to add a new site
- on the Breaker page, the user can select from the breakers associated with the previously selected site or add a new one
- Then a review page will populate with the info added before finally adding it to their organization.
- This process can be repeated as many times as needed for the organization

- On the "Add a User" path they will see a table of all current users in their organization (including the initial user)
- They can add a new user by simply filling the input fields beneath the table
- This process can be repeated as many times as needed for the organization
- Users can be edited or deleted on this table as well

- Once finished adding atleast one device the "Review and Submit" path will open up and they can view all "device" and "user" information.
- Once reviewed, click submit if all information is correct
- An email will be sent to ZEF with the information stored in a JSON object
- The user will see a page that says your information as been successfully sent. 

Built With:
- JavaScript
- React
- Redux-Sagas
- Postgresql
- Node
- Express
- HTML/CSS
- Material UI
- Nodemailer

## ScreenShots

![HomeScreen](/images/homeScreen.jpeg)
![devicePrep](/images/devicePrep.png)
![reviewPage](/images/reviewPage.png)
![addUser](/images/addUser.gif)
![Device Track](/images/AddDevice.gif)

## Installation for local development
Create a database named ez_onboard,
The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an npm install
Run `npm run server` in your terminal
Run `npm run client` in your terminal
The npm run client command will open up a new browser tab for you!
Otherwise it is running on `localhost:3000`

### .env
You will need to create a `.env` file and populate with the info below: 
            
       SERVER_SESSION_SECRET=<random_string_at_least_12_characters>

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Production Build

Before pushing to an AWS ec2 instance, run `npm run build` in terminal. This will create a build folder that contains the code AWS will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## AWS Deployment

0. (Prerequesites)
     - Ensure that you have node, npm, and ssh installed with the following terminal commands:
          * node -v
          * npm -v
          * which ssh
     - In a terminal window, navigate to this folder and run the following commands to install local dependancies and compile the build
          * npm install
          * npm run build
     - Follow the instructions under env above to create and configure a local .env file with a SERVER_SESSION_SECRET string. (used for salting and hashing passwords)
1. From the AWS console, create a new Aurora Serverless DB cluster with PostgreSQL compatability.
     - name your cluster "ez-onboarding-db"
     -  set the username to postgres (default) and the master password to a unique password (e.g. sevenapples)
     -  write down the VPC and subnet group you host it in (you will need them later)
     -  create a new security group that allows access on ports 5000, 433, and 80 as well as SSH access from your IP address.
     -  IMPORTANT: under additional configuration create an initial database name called "ez_onboard"
2. Once you have created the database (will take several minutes) navigate to the db's console and click "modify"
     -  under connectivity, click the box to enable web service data api and apply cluster modifications immediately.
     -  navigate to Query Editor from the RDS console and select add new database credentials
     -  connect to your ez_onboard database using your cluster name, postgres username and password
     -  verify that your connection was successful by running the auto-generated SQL line in the editor
        * if it was not successful, an error will show under Rows Returned
     -  Once your connection is successful, copy and paste the SQL queries from the database.sql file in this repo and run them in the query editor. (Only once!)
     - To test, run the query: ``` SELECT * FROM "device_type";``` which should return four rows!
3. To source this DB into the app, create a variable in the .env file called DATABASE_URL=
     -  (If you did not yet set up the SERVER_SESSION_SECRET variable in this .env file, follow the directions under .env above and then return to this step)
     - DATABASE_URL's value should be a string built with the following formula: 
     - postgresql://username:password@DBendpoint:Port/DBname
     - the final form should look like the next line if you used postgres as a username and sevenapples as a password:
     - DATABASE_URL=postgresql://postgres:sevenpples@ez-onboard-trial-2.cluster-cdq0gf9yqizb.us-east-2.rds.amazonaws.com:5432/ez_onboard
4. Create a new EC2 instance to house the front end of the application:
     - From the AWS console, launch a new ec2 instance
     - Name this instance ez-onboard-server
     - Choose Ubuntu SSD AMI
     - For optimal performance, chose a type t2.small or larger instance (React files are large!)
     - Ensure that both the Network/VPC and Subnet for this instance are the same as the one the database is housed in.
     - Select from existing security groups to choose the same security group associated with the database.
     - After clicking launch, create a new keypair called ez-onboard-key.pem
          * IMPORTANT: save this .pem file in the base directory for this project (adjacent to this readme)
     - Launch instance (will take a few minutes)
5.  Configure ecosystem.json scripts to connect to EC2 instance
     - Note: The following directions are also detailed on [ZEF Deployment Documentation](http://docs.zefenergy.com/ocpp/deployment/)
     - Under deploy, either configure the development script or create a new script with the following credentials:
          * "user": "ubuntu",
          * "host": Public IPv4 DNS,
          * "key": "./ez-onboard-key.pem",
          * "ref": "origin/main",
          * "repo": "https://github.com/matthewblackler/zefnetonboard.git",  (or replace with repo)
          * "path": "/home/ubuntu/ez-onboarding",
          * "pre-setup": "./pre-setup.script",
          * "post-setup": "hash -d npm;npm install",
          * "post-deploy": "pm2 startOrRestart ecosystem.json"
6.  Run deployment script
     - Open a terminal window and navigate to the folder containing this Readme file.
     - modify the permissions of your access key by running:
          * chmod 400 ez-onboard-key.pem
     - commit all code and push to master branch
          * git push origin master
     - Use PM2 to setup the server environment and clone the code onto the server by referencing the new entry in the ./ecosystem.json file.
          * PM2 deploy development setup
     - Note: this first attelpt will fail. Despite the earlier steps to create a key relationship between the EC2 Server and CodeCommit, the only proper way to verify that relationship is to ensure the CodeCommit domain and IP is added to the list of 'known hosts' on the EC2 server. That will not happen until the EC2 Server has verified the authenticity of the host. Unfortunately the automated script cannot handle that step as it deliberately requires user input, so it may fail. To manually perform this step, log into the EC2 server via a shell connection and attempt a manual clone of the code from Github.
7. Manually SSH into the EC2 instance and clone the code from github:
     - Open a new terminal window and navigate to this directory
     - using the EC2 instance's Public IPv4 DNS address, run the following command to establish a connection:
          * ssh -i ez-onboard-key.pem ubuntu@Public IPv4 DNS address
     - Once successfully connected to the EC2 instance, manually clone over the code from github using the command:
          * git clone https://github.com/matthewblackler/zefnetonboard.git
     - You will have to log in to a github account with access to the above repo using a username and password.
     - Once the clone is complete you can go back and re-run the setup command which should succeed now!
          *  PM2 deploy development setup
          *  PM2 deploy development update
               - Also use this command to push any subsequent code changes to the environment
     - once the delpoyment script has run successfully, you can go back and delete the manually cloned files from the instance
8. Manually add the .env file in to the source folder in the EC2 instance
     - Using the SSH command from earlier, connect to the ec2 instance from your terminal 
          * ssh -i ez-onboard-key.pem ubuntu@Public IPv4 DNS address
     - navigate to /ez_onboarding/source
     - Open a new .env file using vi
          * vi .env
     - Copy and paste the contents from your local .env file and then exit with the commad :wq!
          * SERVER_SESSION_SECRET=long_random_string
          * DATABASE_URL=postgresql://postgres:sevenpples@ez-onboard-trial-2.cluster-cdq0gf9yqizb.us-east-2.rds.amazonaws.com:5432/ez_onboard
9. Listening on Port 80 without using root
     - Inside the EC2 instance, install authbind to allow binding to port 80
          * sudo apt-get install -y authbind
     - Within the instance, run the following authbind commands useing the username ubuntu
          * sudo touch /etc/authbind/byport/80
          * sudo chown ubuntu /etc/authbind/byport/80
          * sudo chmod 755 /etc/authbind/byport/80  
     - To add an alias to the user that runs the pm2 profile create a ~/.bash_aliases file in vi
          * vi .bash_aliases
     - Add the following line in the file and save with :wq
          * alias pm2='authbind --deep pm2'
     - Immediately after saving run the following command:
          * source ~/.bash_aliases
     - Ensure that pm2 is updated with authbind:
          * autbind --deep pm2 update
     - after PM2 has restarted, you should see it listening on port 80 when running the following command from within the EC2 instance:
          * netstat p1nt
10. Supply SSL certificate as input to client app
     - f
11. Listening on Port 443
     - Within the instance, run the same authbind commands as listed in step 9, but configuring for port 443:
          * sudo touch /etc/authbind/byport/443
          * sudo chown ubuntu /etc/authbind/byport/443
          * sudo chmod 755 /etc/authbind/byport/443 
     - Ensure that pm2 is updated with authbind:
          * autbind --deep pm2 update 
     - after PM2 has restarted, you should see it listening on port 443 when running the following command from within the EC2 instance:
          * netstat p1nt
12.  Revisit your connection between the 

## License
MIT Copyright (c) 2020 Amir Mussa, Ace Fox, Robert Johnson

## Acknowledgement
Thank you to ZEF Energy for giving us the opportunity to employ our new skills and create this application.
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality. 
Special shout out to Amir, Ace, and Rob for the hardwork put into the project.

