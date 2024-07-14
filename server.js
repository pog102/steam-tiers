const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const axios = require('axios');


const API_KEY = ''; //goto  https://steamcommunity.com/dev/apikey	
const STEAM_ID = '76561198396788215';               //goto  https://www.steamidfinder.com/
app.use(express.static(path.join(__dirname, '.')));

app.post('/fetchGames', async (req, res) => {
    try {
        const response = await axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/', {
            params: {
                key: API_KEY,
                steamid: STEAM_ID,
             //   include_appinfo: true,
                format: 'json'
                
            }
        });

         // Extract appid values from the response
        const games = response.data.response.games;
       //  const games = response.data.response.games.filter(game => game.playtime_forever > 5);
         const gameImages = games.map(game => `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`);
         
         res.json({ status: 'success', gameImages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error fetching owned games.' });
    }
});app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
