A simple HTML and js game.
Credit: https://www.w3schools.com/graphics/game_intro.asp


Running the Game
To run the game, simply open index.html in a browser. Or, alternatively, run a local server like http-server or local-web-server (required to run the start script from package.json). These are packages that would need to be installed locally or globally on the system.

::: Task :::
============

1. Add keyboard events for up, down, left and right arrow keys.
2. Add user login and logout. Upon login, the user should be able to see their highest score so far.
3. Track the games played by the user and their scores. [Not local or session storage; at db level]
4. Allow only 10 attempts per user per day.

Notes -
* Do not use social or third party auth
* MongoDB or a comparable no-sql db should be used

# To Run the project

1. On root directory
### `npm install`

2. On root directory cd to frontend folder
### `npm install`

3. On root directory after installing all packages 
### `npm start`


# To Run the Node alone

* On root directory
### `npm run server`

# To Run the React alone

* On root directory cd to frontend folder
### `npm run client`