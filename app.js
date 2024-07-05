// Libraries
const express = require('express');
const axios = require('axios');
const path = require('path');
// Initialize App
const app = express();

// Middleware to serve static files, parsing of URL-Encoded Bodies and JSON setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GLOBAL VARIABLES //
// Ignore Below. This is the obfuscated API key
function _0x31a1(){const _0x58ff1e=['BF7DAA81C4','5AF9C5D643','227521zRoCKW','267122JnQfGv','7E41DC1C09','4558041YYJmuN','36TOgWNq','400800EgADRu','32wLSpgn','63267TtXofv','899130LUoHyN','27394TwBnmM'];_0x31a1=function(){return _0x58ff1e;};return _0x31a1();}const _0x48801f=_0x5da0;(function(_0x20a11e,_0x4bdf4f){const _0x22ac07=_0x5da0,_0x3f4366=_0x20a11e();while(!![]){try{const _0x36bc3d=parseInt(_0x22ac07(0x174))/(-0x5*-0x112+-0x1*0x952+-0x1*-0x3f9)+parseInt(_0x22ac07(0x178))/(-0x1*-0x1edf+0x9*0x210+0x316d*-0x1)+parseInt(_0x22ac07(0x172))/(-0x2324+0x703*-0x5+0x4636)*(-parseInt(_0x22ac07(0x16f))/(0x624+0x10bc+-0x4d*0x4c))+-parseInt(_0x22ac07(0x173))/(0x1*0xadb+0xb7b+-0x1651)+-parseInt(_0x22ac07(0x170))/(-0xda5+-0x236e+-0x3119*-0x1)+-parseInt(_0x22ac07(0x177))/(-0x212b+0x3*0x7be+0x58*0x1d)*(parseInt(_0x22ac07(0x171))/(-0x45f*-0x3+0x24c9+-0x31de))+parseInt(_0x22ac07(0x16e))/(-0x5*-0x13+-0x516+0x4c0);if(_0x36bc3d===_0x4bdf4f)break;else _0x3f4366['push'](_0x3f4366['shift']());}catch(_0x1fb5fc){_0x3f4366['push'](_0x3f4366['shift']());}}}(_0x31a1,0xd28f+0x19546+-0x375c*0x4));function _0x5da0(_0x1c8176,_0x1f6333){const _0xb45124=_0x31a1();return _0x5da0=function(_0x5416b5,_0x1c9e1){_0x5416b5=_0x5416b5-(0x749*-0x1+0xb49+-0x293);let _0x362814=_0xb45124[_0x5416b5];return _0x362814;},_0x5da0(_0x1c8176,_0x1f6333);}const api_key=_0x48801f(0x16d)+_0x48801f(0x176)+_0x48801f(0x175)+'6D';
const api_endpoint = "http://api.steampowered.com" // API Endpoint

// API route that takes a Steam ID as a parameter and fetches the friends list
app.post('/getFriends', async (req, res) => {
  // Get steamID from request
  const steamID = req.body.steamID;
  // Check for steamID
  if (!steamID) { // If no id raise error
    return res.status(400).json({ error: 'Steam ID is required' });
  }

  try {
    // Axios call for data
    const response = await axios.get(`${api_endpoint}/ISteamUser/GetFriendList/v1/?key=${api_key}&steamid=${steamID}&relationship=friend`);
    const friendsList = response.data.friendslist.friends;
    res.json(friendsList);
  } catch (error) {
    if (error.response) {
      res.status(500).json({ error: `Error: ${error.response.data.message}` });
    } else if (error.request) {
      res.status(500).json({ error: 'Error: No response received from the API' });
    } else {
      res.status(500).json({ error: `Error: ${error.message}` });
    }
  }
});

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port declaration and listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});