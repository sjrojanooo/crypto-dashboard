const config = require('./utils/config'); 
const logger = require('./utils/logger')
const http = require('http'); // enables http request 
const express = require('express'); // enables express middleware
const axios = require('axios'); // enables axios request packages
const cors = require('cors'); // enables cross origin resource sharing package
const fs = require('fs'); 
const googleTrends = require('google-trends-api'); 
const createAlchemyWeb3 = require('@alch/alchemy-web3')

const app = express(); 

app.use(express.json()); 
app.use(cors()); 



// processing dates for line graph on front end
const today = Math.round((new Date().getTime() + 60*60*60*1000) / 1000); 
const oneYearAgo = Math.round((new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime() - 60*60*60*1000)/1000); 


// Historical Candlestick Charting data from birth of token; 
const imx15MinURL = `https://api.cryptowat.ch/markets/coinbase-pro/imxusd/ohlc?before=1646015643&after=1636095600&X-CW-API-Key=${config.ALT_ME_KEY}`
const btcOHLC = `https://api.cryptowat.ch/markets/binance/btcusdt/ohlc?after=${oneYearAgo}&X-CW-API-Key=${config.ALT_ME_KEY}`
const ethOHLC = `https://api.cryptowat.ch/markets/binance/ethusdt/ohlc?after=${oneYearAgo}&X-CW-API-Key=${config.ALT_ME_KEY}`

const mostVisitedCurrencies = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers?limit=100&CMC_PRO_API_KEY=${config.CMC_KEY}`
// const btcOHLC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/historical&${cmcKey}`



// ONGOING AIRDROPS URL; 
const airdropDataURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/airdrops?CMC_PRO_API_KEY=${config.CMC_KEY}`





// for loop function to iterate over nested tuples and extract all specific values from response
function iterateData(array){

    let returnedArray =[]; 

    for(index = 0; index < array.length; index++){

        let myObj={}

        myObj.closeTime= array[index][0],
        myObj.openPrice= array[index][1],
        myObj.highPrice= array[index][2],
        myObj.lowPrice=array[index][3],
        myObj.closePrice= array[index][4],
        myObj.volume= array[index][5],
        myObjquoteVolume= array[index][6],
        
        returnedArray.push(myObj)
    }
    return returnedArray
}


// function to writeMyFile 
function writeFile(myObj, myString){
    fs.writeFile(`./data/${myString}.json`, JSON.stringify(myObj), err => {
        if(err)
        {
            console.error(err)
        }
        else{
            console.log('file-complete')
        }
    })
}


// request to fetch data; 
function getData(url){
    const request = axios.get(url); 
    return request.then(response => response)
}


async function listOHLCData(){

    const listMarkets = await getData(btcOHLC); 

    let oneDayData = iterateData(listMarkets.data.result['86400']);

    return oneDayData; 

}


async function listEthOHLCData(){
    
    const listEthOHLC = await getData(ethOHLC); 

    let oneDayData = iterateData(listEthOHLC.data.result['86400']);

    return oneDayData; 

}


async function altMeData(){
    const data = await getData('https://api.alternative.me/fng/?limit=365&date_format=us');

    return data.data
}


// all current defi projects; 
async function getDefiData(){
    const data = await getData(`https://data-api.defipulse.com/api/v1/defipulse/api/GetProjects?api-key=${config.DEFI_KEY}`);
    return data.data
}

// handling airdrop data;
async function getAirdropData() {
    const handleAirdropData = await getData(airdropDataURL);
    // console.log(handleAirdropData)
    return handleAirdropData.data
};

async function getGainerAndLosers(){
    // AIRDROP STATISTICS URL; 
    
    const handleGainers = await getAirdropData()

    const symbolList = handleGainers.data.map(airdropSymbols => airdropSymbols.coin.slug).join()

    const time_period = ['24h,7d']

    const airdropGainerLosers = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${symbolList}&CMC_PRO_API_KEY=${config.CMC_KEY}`

    const handleAirdropStatistics = await getData(airdropGainerLosers); 

    console.log(handleAirdropStatistics.data)

    return handleAirdropStatistics.data
}


(async() =>{

    try
    {
        const response = await Promise.all(
            [
                altMeData(), 
                listOHLCData(),
                listEthOHLCData(),
                getDefiData(),
                getAirdropData(),
                getGainerAndLosers()
            ]);



        // console.log(response)
        let myObj = {
            alternateMe: response[0],
            ohlc: response[1],
            ethOhlc: response[2],
            defi: response[3]
        };

        let airDropObj = {
            airdrop: response[4],
            airdropStats: response[5]
        }

        // Dashboard homepage; 
        app.get('/', (req, res) => {
            res.send(myObj); 
        })

        //airdrop route;
        app.get('/airdrop', (req, res) => {
            res.send(airDropObj)
        })


        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`)
        })
    }
    catch (err)
    {
        console.log(err)
    }
})(); 
