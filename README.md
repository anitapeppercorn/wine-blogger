# Wine Blogger - Full Stack Application.
This is a  wine app implemented using node.js, express.js, mySQL, Sequelize ORM, the AWS S3 bucket and handlebars.js that allows users to track their inventory of collected wines and socially interact with other wine lovers. This site is built from scratch and deployed to Heroku. The app follows an MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. The wine images shared by the user are processed using Multer and are posted and retrieved for display from an AWS S3 bucket we created. We created tests and tested pur app with jest.

(We have used an Express.js API, configure it to use Sequelize to interact with a MySQL database).

1. A link to the start up demo video is included here https://youtu.be/KlwsOc-TnfQ 
2. The application is deployed at https://secure-chamber-23014.herokuapp.com/
3. This code for the app is published to github at: https://github.com/anitapeppercorn/wine-blogger

## Link to Deployed App

https://secure-chamber-23014.herokuapp.com/

## Contents
- [Description](#Description)
- [Demo & Models](#Demo&Models)
- [User Story](#User-Story)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Installation](#Installation)
- [Dependencies](#Dependencies)
- [License](#License)
- [Author](#Author)

## Description

Sharing your experiences with fellow wine enthusiasts can be just as important drinking it. Wine lovers spend plenty of time searching for fine wines and savoring them, but most wine enthusiasts also spend at least some of their time reading and writing about their wine experiences, exploring new wineries and vintages, grape varietals and food combinations with their favorite wines. A simple Google search reveals a wide variety of wine types and opportunities to taste new varietals!

## Demo & Models
![Image of app](/images/winebloghome.png)
![DemoVideo](https://youtu.be/KlwsOc-TnfQ)
### Demo 
The video shows how a user would invoke the application from the command line.

### User Story
AS A wine enthusiast who enjoys sharing and writing about my experiences exploring new varieties and vintages
I WANT a blog site
SO THAT I can share images of wine bottles, information of the wine (name/type/appelation, price, tasting experience), and explore ways to all to my personal inventory (collection) of wines in my cellar.

### Acceptance Criteria
GIVEN a wine blog site
- WHEN I visit the site for the first time
-- THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the inventory; and the option to log in
- WHEN I click on any other links in the navigation
-- THEN I am prompted to either sign up or sign in
- WHEN I choose to sign up
-- THEN I am prompted to create a username and password, and confirm that I am over 21 years of age
- WHEN I click on the sign-up button
--THEN my user credentials are saved and I am logged into the site
- WHEN I revisit the site at a later time and choose to sign in
-- THEN I am prompted to enter my username and password
- WHEN I am signed in to the site
-- THEN I see navigation links for the homepage, inventory, and the option to log out
- WHEN I click on the homepage option in the navigation
-- THEN I am taken to the homepage and presented with all wine-blog posts that include the wine-name, an image of the wine if available, the blogger's name, information about the wine and the blogger's post on their experience with the wine
- WHEN I click on an existing wine-blog post
-- THEN I am presented with the the wine-name, an image of the wine if available, the blogger's name, information about the wine and the blogger's post on their experience with the wine and I have the option to leave a comment
- WHEN I enter a comment and click on the submit button while signed in
-- THEN the comment is saved and the post is updated to display the comment, and the comment creator’s username
- WHEN I click on the Inventory option in the navigation
-- THEN I am taken to the Inventory and presented with all the wine-blog posts I have already created for wines in my inventory and the option to add a new wine-blog post
- WHEN I click on the button to add a new wine-blog post
-- THEN I am prompted to enter or select information of the wine-type, size of bottle, price, tasting experience and an image of the wine to document my personal inventory (collection) of wines in my cellar and the title and contents of my wine-blog post are saved and I am taken back to an updated inventory with my new post
- WHEN I click on one of my existing posts in my inventory
-- THEN I am able to delete or update my post and taken back to an updated inventory
- WHEN I click on the logout option in the navigation
-- THEN I am signed out of the site
- WHEN I am idle on the page for more than a set time
-- THEN I am automatically signed out of the site

Specification we met:
1. Use Node.js and Express.js to create a RESTful API.
2. Use Handlebars.js as the templating engine.
3. Use MySQL and the Sequelize ORM for the database.
4. Have both GET and POST routes for retrieving and adding new data.
5. Be deployed using Heroku (with data).
6. Use at least one new library, package, or technology that we haven’t discussed. (Multer, aws-sdk)
7. Have a polished UI.
8. Be responsive.
9. Be interactive (i.e., accept and respond to user input).
10. Have a folder structure that meets the MVC paradigm.
11. Include authentication (express-session and cookies).
12. Protect API keys and sensitive information with environment variables.
13. Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
14. Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).


## Installation
To use this application for your own purposes: Clone the GitHub repository, and install all the dependencies, with```npm install```, on the integrated terminal install all the dependcies. 

Create your .env file and type in:
DB_NAME='wine_app_db'
DB_USER='yourusername'
DB_PW='yourpassword'
aws_accesskey='yourawsaccesskey'
aws_secretkey='yourawssecretkey'

In the integrated terminal, seed ``npm run seed`` and start using ``npm start``. 
app will run at localhost3001


### Dependencies
    - "bcrypt": "^5.0.0",
    - "connect-session-sequelize": "^7.0.1",
    - "dotenv": "^8.2.0",
    - "express": "^4.17.1",
    - "express-handlebars": "^5.1.0",
    - "express-session": "^1.17.1",
    - "mysql2": "^2.1.0",
    - "sequelize": "^6.3.4"
    - "aws-sdk": "^2.739.0",
    - "lodash": "^4.17.20",
    - "multer": "^1.4.2",
    - "mysql2": "^2.1.0",
    - "sequelize": "^6.3.4"
    

## License
[MIT License](./LICENSE)
![license](https://img.shields.io/badge/License-MIT-blue)

### Authors: Anita Ganti, Sara Hu, Priva Ravi

View the authors' portfolio at:  
1. https://anitapeppercorn.github.io/anitaprofileportfolio/
![Badge](https://img.shields.io/badge/Github-anitapeppercorn-4cbbb9) 
![Profile Image](https://github.com/anitapeppercorn.png?size=50)
2. https://priyaravi23.github.io/professional-portfolio/
![Badge](https://img.shields.io/badge/Github-priyaravi23-4cbbb9) 
![Profile Image](https://github.com/priyaravi23.png?size=50)
3. https://shhu21.github.io/shhu21profileportfolio/
![Profile Image](https://github.com/shhu21.png?size=50)

[Table of Content](#Table-of-Content) --- [Back to Top](#wine-blogger) --- [Installation](#Installation)# wine-blogger
