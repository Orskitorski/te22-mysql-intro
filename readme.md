mkdir projektnamn
cd projektnamn
npm init -y
touch server.js
npm i express
npm i nodemon -D

Redigera package.json
```JSON
"main": "server.js"
"type": "module"
"scripts": {
    "dev": "nodemon server.js
}
```