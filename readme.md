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

2024-12-03

idag fixade jag ett formulär för att skapa nya arter och ett formulär för att skapa nya fåglar. Dessa arter och fåglar sparas i databasen och kan kommas åt genom listan på /birds

2024-12-10

Idag så fixade jag så att min sida blev lite finare, fixade routes istället för att allting ligger i server.js, fixade species m.m