require('dotenv').config(); 

//port 
const PORT = process.env.PORT; 

// alternate me api key 
const ALT_ME_KEY = process.env.WATCH_KEY; 

// cmc api key
const CMC_KEY = process.env.CMC_KEY;

//Alchemy Pay Key
const ALCH_KEY = process.env.ALCH_KEY; 

//Defi-Pulse Key
const DEFI_KEY = process.env.DEFI_KEY; 


module.exports = {
    ALT_ME_KEY, 
    CMC_KEY,
    ALCH_KEY,
    DEFI_KEY,
    PORT
}