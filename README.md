<div align="center">
    <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1581339291/wn3hrs8tpyejvw1nju7d.png" />
</div>

<h1 align="center">
   FastFeet Fullstack app
</h1>

<h4 align="center">
  Fastfeet is a fictitious logistics company and the application consists of an api in NodeJS, a web app in ReactJS, that allows the admin to manage recipients, deliverymen and deliveries and a mobile app in React Native, that allows the deliveryman to see and update the status of his deliveries and inform if there are any problems with it.
</h4>

<p align="center">
<img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/StefanoSaffran/fastfeet?color=7D40E7">
<img alt="Made by Stefano" src="https://img.shields.io/badge/made%20by-StefanoSaffran-%20?color=7D40E7">
<img alt="Project top programing language" src="https://img.shields.io/github/languages/top/StefanoSaffran/fastfeet?color=7D40E7">
<img alt="GitHub license" src="https://img.shields.io/github/license/StefanoSaffran/fastfeet?color=7D40E7">
</p> 

<p align="center">
  <a href="#rocket-built-with">Built with</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-run">How to run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">Licence</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#mailbox_with_mail-get-in-touch">Get in touch</a>
</p>
<br><br>
<p align="center">
  <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1585036656/fastfeet/itci3xn6yeeiq6bvvqxu.gif" height="320">
  <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1584952630/fastfeet/kifhfhkis7hfk7gh9t2n.gif" height="320">
  <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1584952636/fastfeet/qk966idl6gdby6ow7b40.gif" height="320">
</p>

<p align="center">
  <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1584949678/fastfeet/n3e0rkjgzdy7ewe5ceos.gif" height="400">
  <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1584949827/fastfeet/vkuijpcgxvkhjuz6jmvu.gif" height="400">
</p>

## :rocket: Built with

This project was developed with the following technologies:

-  [Node.js](https://nodejs.org/)
-  [Express](https://expressjs.com/)
-  [React Native](https://facebook.github.io/react-native/)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [Redux-persist](https://github.com/rt2zz/redux-persist)
-  [Styled-components](https://www.styled-components.com/)
-  [React Navigation](https://reactnavigation.org/)
-  [JWT](https://jwt.io/)
-  [Immer](https://github.com/immerjs/immer)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Date-fns](https://date-fns.org/)
-  [AWS S3](https://aws.amazon.com/pt/s3/)
-  [Multer](https://github.com/expressjs/multer)
-  [ESLint](https://eslint.org/)
-  [Prettier](https://prettier.io/)
-  [VS Code](https://code.visualstudio.com/)

## :information_source: How to run
### Requirements
To run the app, you will need [Git](https://git-scm.com), [Node.js](https://nodejs.org/) v12.13.1 or higher, [Yarn](https://yarnpkg.com/), [PostgreSQL](https://www.postgresql.org/) and [Redis](https://redis.io/) installed on your computer. I strongly recommend using [Docker](https://www.docker.com/) to run the databases.
<br>
If you install docker, follow this steps to install and run the docker images.

```bash
# install Redis image
docker run --name imageName -p 6379:6379 -d -t redis:alpine

# install Postgres image (if you don't specify an username it will be postgres by default)
docker run --name imagename -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# start Redis
docker start imageName

# start Postgres
docker start imageName

```
### Backend
Now clone the repository and install the dependencies.
```bash
# to clone the repository
git clone https://github.com/StefanoSaffran/fastfeet.git

# go into the backend folder
cd fastfeet/backend

#install the backend dependencies
yarn

```
In order to connect to the database, you will need to enter the access informations into a .env file, based on a .env.example file that is provided in the backend folder, change the variables according to your environment.
```bash
# run migrations
yarn sequelize db:migrate

# run seeds
yarn sequelize db:seed:all

# run api
yarn dev & yarn queue
```
### Frontend

```bash
# in another tab of the terminal install the frontend dependencies and run it 
cd frontend
yarn
yarn start
```
Use this credentials to access the web application
<blockquote><strong>email:</strong> admin@fastfeet.com</blockquote>
<blockquote> <strong>senha:</strong> 123456</blockquote>

### Mobile

The Application was developed using Expo. It is a free and open source toolchain built around React Native to facilitate the process of running and testing applications. [Click here](https://expo.io/learn) to get start with Expo.

```bash
# install the dependencies
cd mobile
yarn
```

In order to run the application on your device, you need to change the ip config.

[api.js](https://github.com/StefanoSaffran/fastfeet/blob/master/mobile/src/services/api.js)
```javascript
  baseURL: 'http://192.168.0.185:3333',
```
replace 192.168.0.185 with your machine's ip.

If you want to use Reactotron change the ip in the Reactotron config file.

[ReactotronConfig](https://github.com/StefanoSaffran/fastfeet/blob/master/mobile/src/config/ReactotronConfig.js)
```javascript
  .configure({ host: '192.168.0.185' })
```

Now with everything on place, run the application.

```bash

# to run the app
yarn start

```
Expo will open a page in your browser, scan the QRcode on the page and wait for the app to load.

> The Application was developed and tested on Iphone 6s

---

## :page_facing_up: License

This project is under the MIT license. See the [LICENSE](https://github.com/StefanoSaffran/fastfeet/blob/master/LICENSE) for more information


## :mailbox_with_mail: Get in touch!

[LinkedIn](https://www.linkedin.com/in/stefanosaffran/) | [Website](https://stefanosaffran.com)

---

Made with :coffee: and ♥ by Stefano Saffran.