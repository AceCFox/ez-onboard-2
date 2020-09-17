# ZEFNET EZ ONBOARDING

## Description
Duration: 1 Month Project

ZEFNET EZ ONBOARDING (ZEO) was worked on over the course of a month, and can be split into two parts: one week was spent planning and designing the application, while the last three weeks were spent building and testing the app. 

Our client Zef Energy approached us to fix their "new client onboarding process" with one main problem - the ticket-based onboarding system for new customers. Their former system was very complex, and customers didn't always submit all the necessary information required for signup. This led to Zef Energy needing to have multiple interaction with clients that cost hundreds of dollars per client when signing up, creating a frustration experience for both the client and Zef. 

Our application ZEO fixed the above problems by creating a step by step experience for the client to follow and submit all the necessary information needed which we then collected and sent as an email to ZEF. Reducing the need for multiple interactions and creating a better experience for both parties.

To see the fully functional site, please visit: [Deployed] (https://infinite-wildwood-94061.herokuapp.com/#/home)

### Prerequisites

- [VSCode] (https://code.visualstudio.com/download)
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

## Installation
Create a database named your ez_onboard,
The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an npm install
Run `npm run server` in your terminal
Run `npm run client` in your terminal
The npm run client command will open up a new browser tab for you!
Otherwise it is running on `localhost:3000`

### .env
You will need to create a `.env` file and populate with the info below: 
            
        USER_EMAIL=your_email
        PASS=your_password

Please replace `your_email` with the email address you'd like to send the finished onboarding packet from (the part before @gmail.com).
Please replace `your_password` with the password to that corresponding email address.

This file is already in your `.gitignore` so your email and password will not be uploaded.
This will only work with Gmail

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
7. Add environemnt variables for `USER__EMAIL` and `PASS` with the email info to send the final package from 
8. In the deploy section, select manual deploy

## License
MIT Copyright (c) 2020 Amir Mussa, Ace Fox, Robert Johnson

## Acknowledgement
THank you to Zef Energy for giving us the opportunity to employ or new skills and create this application.
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality. 
Special shout out to Amir, Ace, and Rob for the hardwork put into the project.
