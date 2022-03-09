import React, {useState, useEffect} from 'react'; 
import {Navbar, Nav, Container, Card, Col, Row, Tabs, Tab} from 'react-bootstrap';  
import TechnicalAnalysis from 'react-tradingview-technical-analysis'
import * as Icon from 'react-bootstrap-icons'; 
import _ from 'lodash'; 
import GaugeChart from '../components/GaugeChart'; 
import LineChart from '../components/LineChart'; 
import DefiProjects from '../components/tabs/DefiProjects'; 

import '../index.css'
import reactTradingviewTechnicalAnalysis from 'react-tradingview-technical-analysis';


const Dashboard = () => {

    
    const [allData, setAllData] = useState([]); 
    const [now, setNow] = useState(['']); 
    const [ethHistoricalData, setEthHistoricalData] = useState([]); 
    const [fearGreedIndex, setFearGreedIndex] = useState([]); 

    //tab navigator state variables; 
    const [key, setKey] = useState('indexDash')



    const alternateMeURL = `http://localhost:3001`; 

    useEffect(() => {
    
            let altMeData = [];
    
            const altApiCall = async () => {
            await fetch(alternateMeURL)
            .then((response) => response.json())
            .then((data) => (altMeData = data))

            console.log(altMeData)
 
            let fearArray = altMeData.alternateMe.data.map(array => array); 

        
            setNow(altMeData.alternateMe.data[0]);
            
            // formatting the btc datetime from epoch unix timestamp; 
            const myFinalData = altMeData.ohlc.map(item => {
                const timestamp = new Date(item.closeTime * 1000)
                .toLocaleDateString('en-US', 
                { year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' })
                .split('/')
                .join('-')

                return {...item, timestamp: timestamp};
            });

            // formatting the Ethereum OHLC data; 
            const ethFormatted = altMeData.ethOhlc.map(item=> {
                const timestamp = new Date(item.closeTime * 1000)
                .toLocaleDateString('en-US', 
                { year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' })
                .split('/')
                .join('-')

                return {...item, timestamp: timestamp}
            })

            // creating a copy of alternate me data; 
            const myAltData = altMeData.alternateMe.data.map(array => array);

            // merging the timestamp keys to each unique value; 
            const mergedObjects = _.map(myFinalData, item => {
                return _.extend(item, _.find(myAltData, {timestamp: item.timestamp}));
            }).filter(filter => filter.value != undefined);

            const ethMerge = _.map(ethFormatted, item => {
                return _.extend(item, _.find(myAltData, {timestamp: item.timestamp}))
            }).filter(filter => filter.value != undefined); 

            setEthHistoricalData(ethMerge); 
            setAllData(mergedObjects); 



            setFearGreedIndex(fearArray)
        }
        altApiCall(); 

    },[])

    if(!fearGreedIndex.length) return null

    return(
        <Container>
            <Tabs
            id="noanim-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
                <Tab 
                eventKey="indexDash" 
                title="Fear and Greed Index">
                    <Row>
                    <Col>
                        <Card className="dashCardSubHeaders">
                            <Card.Header>Fear and Greed Index</Card.Header>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Header>Historical Values</Card.Header>
                                            <Card.Body>
                                                <h5 className="historicalBodyHeadings">{`Now: ${fearGreedIndex[0]['value_classification']} - ${fearGreedIndex[0]['value']}`}</h5>
                                                <hr/>
                                                <h5 className="historicalBodyHeadings">{`Yesterday: ${fearGreedIndex[1]['value_classification']} - ${fearGreedIndex[1]['value']}`}</h5>
                                                <hr/>
                                                <h5 className="historicalBodyHeadings">{`Last Week: ${fearGreedIndex[2]['value_classification']} - ${fearGreedIndex[2]['value']}`}</h5>
                                                <hr/>
                                                <h5 className="historicalBodyHeadings">{`Last Month: ${fearGreedIndex[3]['value_classification']} - ${fearGreedIndex[3]['value']}`}</h5>
                                                <hr/>
                                            </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>Fear Greed Index Gauge</Card.Header>
                                            <GaugeChart now={now}/>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="dashCardHeaders">
                            <Card.Header>Fear and Greed Index vs BTC <Icon.InfoCircle className="infoCircle"></Icon.InfoCircle></Card.Header>
                                <Card.Body>
                                    <LineChart 
                                    allData={allData} 
                                    ethHistoricalData={ethHistoricalData}
                                    />
                                </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Tab>
                <Tab 
                eventKey="yieldRates" 
                title="Yield Farming"
                >
                    <DefiProjects />
                </Tab>
                <Tab
                eventKey="candleCharts"
                title="Live Charts"
                ></Tab>
            </Tabs>
        </Container>

    )
}

export default Dashboard; 