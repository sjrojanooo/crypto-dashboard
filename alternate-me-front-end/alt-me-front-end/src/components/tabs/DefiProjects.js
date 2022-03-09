import React from 'react'; 
import * as RB from 'react-bootstrap'; 
import { Container, Row } from 'react-bootstrap';


const DefiProjects = () => {

    const [projects, setProjects] = React.useState([]);
    const [uniqueProjects, setUniqueProjects] = React.useState(['']); 
    const [query, setQuery] = React.useState(''); 



    const alternateMeURL = `http://localhost:3001`; 
    React.useEffect(() => {

        const defiProjects = async () => {

            let defiData = []; 

            await fetch(alternateMeURL)
            .then((response) => (response.json()))
            .then((data) => (defiData = data.defi)); 


            setUniqueProjects(new Set(defiData.map(array => array.name)))
        }
        defiProjects(); 
    },[])


    React.useEffect(() => {

        const defiProjects = `https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=ETH"?amount500&api-key=`

    },[uniqueProjects])


    console.log(uniqueProjects) 
 
    return(
        <RB.Container>
            <RB.Row>
                <RB.Col>
                    <RB.Card>
                        <RB.Card.Header className="dashCardHeaders">Total Value Locked in DeFi Projects</RB.Card.Header>
                        <RB.Card.Body>
                            <RB.InputGroup>

                            </RB.InputGroup>
                        </RB.Card.Body>
                    </RB.Card>
                </RB.Col>
            </RB.Row>
        </RB.Container>
    )
}

export default DefiProjects; 