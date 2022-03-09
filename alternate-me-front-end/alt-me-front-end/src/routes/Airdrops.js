import React, {useState, useEffect,Fragment} from 'react'; 
import _ from 'lodash'; 
import '../index.css';
import {
    Container, 
    Card, 
    Col, 
    Row,
    Table, 
    Button
} from 'react-bootstrap';  
console.log(process.env.REACT_APP_CMC_KEY)

const Airdrops = () => {

    // state variables for airdrop data;
    const [airdrop, setAirdrop] = useState([]); 
    const [sortedState, setSortedState] = useState('asc')
    const [symbol, setSymbol] = useState([]); 


    useEffect(() => {

        // request to server to fetch the airdrop data; 
        let onGoingAirdrops = []; 
        const airdropData = async () => {
            await fetch('http://localhost:3001/airdrop')
            .then((response) => response.json())
            .then((data) => (onGoingAirdrops = data));

            let airdropArray = onGoingAirdrops.airdrop.data.map(array => {
                return {...array, symbol: array.coin.symbol}
            })


            let statObj = Object.keys(onGoingAirdrops.airdropStats.data).map(key => 
              onGoingAirdrops.airdropStats.data[key]
            )

            let mergedObj = _.map(statObj, item=> {
                return _.extend(item, _.find(airdropArray, {symbol: item.symbol}))
            }).sort((a,b) => {
                if(a.coin.name < b.coin.name){
                    return -1 
                }
                if(a.coin.name > b.coin.name){
                    return 1
                }
                return 0
            }).map(array => {
                if(array.quote.USD.percent_change_24h===null){
                    array.quote.USD.percent_change_24h = 0;
                }
                if(array.quote.USD.percent_change_7d===null){
                    array.quote.USD.percent_change_7d = 0; 
                }
                if(array.circulating_supply === null){
                    array.circulating_supply =0
                }
                return {...array}
            })


            setAirdrop(mergedObj); 

            console.log(mergedObj); 

        }
        airdropData();

    },[]);

    if(!airdrop.length) return null


    // Sort tables by columns; 
    const handleSortKeys = (event, eventKey) =>  {

        let newSortedState = [];

        console.log(eventKey)

        console.log(sortedState)

        if(sortedState === 'asc'){
            setSortedState('desc')
        }
        else
        {
            setSortedState('asc')
        }

        if(event.target.attributes[1].nodeValue === 'name' &&
        sortedState === 'asc')
            {

            newSortedState = airdrop; 
            newSortedState.sort((a,b) => {
                if(a.coin.name < b.coin.name){
                    return 1
                }
                if(a.coin.name > b.coin.name){
                    return -1
                }
                return 0 
            })
            setAirdrop(newSortedState)

            console.log(airdrop)
        }

        if(event.target.attributes[1].nodeValue === 'name' &&
        sortedState === 'desc'
        ){
            newSortedState = airdrop; 
            newSortedState.sort((a,b) => {
                if(a.coin.name > b.coin.name){
                    return 1
                }
                if(a.coin.name < b.coin.name){
                    return -1
                }
                return 0 
            })
            setAirdrop(newSortedState)
            console.log(airdrop)
        }
        if(event.target.attributes[1].nodeValue !='name' &&
            sortedState === 'asc'
        )
        {
            newSortedState = airdrop.sort((a,b) => a.quote.USD[`${eventKey}`] - b.quote.USD[`${eventKey}`]);

            setAirdrop(newSortedState)
            console.log(airdrop)
        }

        if(event.target.attributes[1].nodeValue !='name' &&
        sortedState === 'desc'
        )
        {
        newSortedState = airdrop.sort((a,b) => b.quote.USD[`${eventKey}`]- a.quote.USD[`${eventKey}`]);

            setAirdrop(newSortedState)
            console.log(airdrop)
        }

        if(
            event.target.attributes[1].nodeValue === 'circulating_supply' && 
            sortedState === 'asc'
        )
        {
            newSortedState = airdrop.sort((a,b) => a[`${eventKey}`] - b[`${eventKey}`]);

            setAirdrop(newSortedState)
            console.log(airdrop)
        }

        if(
            event.target.attributes[1].nodeValue === 'circulating_supply' && 
            sortedState === 'desc'
        )
        {
            newSortedState = airdrop.sort((a,b) => b[`${eventKey}`] - a[`${eventKey}`]);

            setAirdrop(newSortedState)
            console.log(airdrop)
        }
    }

    // rendered template that will display items in a list. might change to the accordion style;
    return(
        <Container>
            <Row>
                <Col>
                    <Col>
                        <Card>
                            <Card.Header className="dashCardHeaders">Current Airdrop Campaigns</Card.Header>
                            <Row>
                                <Col>
                                <Card.Body>
                                <Table striped bordered hover size="xlg">
                                    <thead>
                                        <tr>
                                        <th className="nameVals">#</th>
                                        <th className="nameVals" val="name" onClick={e => handleSortKeys(e, 'name')}>Name</th>
                                        <th className="headVals" val="price" onClick={e => handleSortKeys(e, 'price')}>Price</th>
                                        <th className="headVals" val="hour24" onClick={e => handleSortKeys(e, 'percent_change_24h')}>24h%</th>
                                        <th className="headVals" val="day7" onClick={e => handleSortKeys(e, 'percent_change_7d')}>7d%</th>
                                        <th className="headVals" val="markCap" onClick={e => handleSortKeys(e, 'market_cap')}>Market Cap</th>
                                        <th className="headVals" val="cirSupply" onClick={e => handleSortKeys(e, 'circulating_supply')}>Circulating Supply</th>
                                        <th className="headVals" val="prize" onClick={e => handleSortKeys(e, 'winner_count')}>Airdrop Prize</th>
                                        <th className="headVals" val="link">Airdrop Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airdrop.map((item, i) => {
                                            return(
                                                <Fragment>
                                                    <tr key={i}>
                                                        <td>{i}</td>

                                                        <td>{item.coin.name}</td>

                                                        <td className="coinVals">{Intl.NumberFormat('en-US', 
                                                        {style:'currency',
                                                        currency:'USD',
                                                        minimumFractionDigits: 4
                                                        })
                                                        .format(item.quote.USD.price
                                                        )}</td>

                                                        <td className="coinVals">{Intl.NumberFormat('en-US', 
                                                        {style:'percent',
                                                        minimumFractionDigits: 2,
                                                        minimumFractionDigits: 2
                                                        })
                                                        .format(item.quote.USD.percent_change_24h?.toFixed(2) / 100)}</td>

                                                        <td className="coinVals">{Intl.NumberFormat('en-US', 
                                                        {style:'percent',
                                                        minimumFractionDigits: 2,
                                                        minimumFractionDigits: 2
                                                        })
                                                        .format(item.quote.USD.percent_change_7d?.toFixed(2) / 100)}</td>

                                                        <td className="coinVals">{Intl.NumberFormat('en-US', 
                                                        {style:'currency',
                                                        currency:'USD',
                                                        minimumFractionDigits: 2
                                                        })
                                                        .format(item.quote.USD.market_cap
                                                        )}</td>

                                                        <td className="coinVals">{Number(item.circulating_supply?.toFixed(2)).toLocaleString('en-US')}</td>
                                                        <td className="coinVals">{Number(item.total_prize).toLocaleString('en-US')}</td>
                                                        <td className="coinVals"><Button variant="link" href={item.link}>{item.name} Airdrop Link</Button></td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Col>
            </Row>
        </Container>

    )
}

export default Airdrops; 