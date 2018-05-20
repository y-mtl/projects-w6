# Chatty App Project

This App is a part of LHL projects, and it will let users chat online.
A minimal and light dev environment for ReactJS!

There are 2 main folders for this project:
1. Front-end side: react-simple-boilerplate (Chatty React App)
2. Server side: chatty_server (Chatty WebSockts Server)

### Usage

1. Clone it and create your own git repo.
2. Install the dependencies and start the server.

npm install
npm start
open http://localhost:3000

Chatty React App (Front-end): http://localhost:3000
Chatty WebSockets Server (Server side): http://localhost:3001

### Final Product
!["Screenshot of Chat page"](https://raw.githubusercontent.com/y-mtl/projects-w6/master/wk6-chatty-app/docs/animated2.gif)
!["Screenshot of Chat page"](https://raw.githubusercontent.com/y-mtl/projects-w6/master/wk6-chatty-app/docs/screenshot1.png)
!["Screenshot of Chat page when a user types"](https://raw.githubusercontent.com/y-mtl/projects-w6/master/wk6-chatty-app/docs/screenshot2.png)
!["Screenshot of Chat page when another user types"](https://raw.githubusercontent.com/y-mtl/projects-w6/master/wk6-chatty-app/docs/screenshot3.png)

### Static Files

You can store static files like images, fonts, etc in the `build` folder.
For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project (fronincludes React ESLint configuration.

```
npm run lint
```

### Dependencies
Here are main dependencies.

Server side:
* Express
* UUID
* Websockets -this app uses [ws](https://github.com/websockets/ws)

Front-end side:
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

**There are serverl dev dependencies as well. Please check package.json file and download required dependencies.
