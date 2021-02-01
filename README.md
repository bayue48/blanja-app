# Blanja App

<div align="center">
</div>

## Contents

- [Description](#description)
- [Screenshoots](#screenshoots)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [ENV](#ENV)
- [Usage](#Usage)
- [Demo](#demo)
- [Related Project](#related-project)

## Description

An E-commerce website thar we can buy and sell new or used goods called Blanja which is created using bootstrap frameworks.

## Screenshoots

<div align="center">
   <img width="100%" src="./public/Screenshot_15.png">
   <img width="100%" src="./public/Screenshot_6.png">
   <img width="100%" src="./public/Screenshot_8.png">
</div>

## Features

- Search Product
- Add Product
- Edit Product
- Edit Profile
- etc

### Requirements

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactJs`](https://reactjs.org/)
- [`Blanja API`](https://github.com/bayue48/blanja-api.git)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/bayue48/blanja-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   This will install the dependencies inside `node_modules`
   
### ENV

Please create and make the changes in the .env file.

```bash
REACT_APP_BASEURL = "http://host_backend:port_backend"
```

Example :

```bash
REACT_APP_BASEURL = "http://localhost:4000"
```

### Usage

`node index` OR `nodemon start` OR `npm start`.

Runs the app in the development mode.<br>
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

If you want to build, type `npm run build`.

## Demo

This is Blanja Web build version, let's try it.

[http://](http://)

## Related Project

RESTful API for this web application, clone this for development.

<a href="https://github.com/bayue48/blanja-api.git">REST API</a>
