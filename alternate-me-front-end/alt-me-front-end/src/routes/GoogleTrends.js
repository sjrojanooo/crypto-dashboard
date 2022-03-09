import React, {useState, useEffect} from 'react'; 
import {
    Navbar, 
    Nav, 
    Container, 
    Card, 
    Col, 
    Row, 
    InputGroup,
    Button,
    FormControl
} from 'react-bootstrap';  
import axios from 'axios'; 


const GoogleTrends = () => {

    const [query, setQuery] = useState(''); 




    return(
        
        <Row>
            <Container>
                <Card>
                    <Card.Header className="dashCardHeaders">Google Trends</Card.Header>
                    <Row>
                    <Col>
                    <Card>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            
                            <FormControl 
                            aria-label="Google Trend Search"
                            aria-describedby="basic-addon1"
                            method="POST"
                            action="/googletrends"
                            id="googleTrendSearch" 
                            name="googleTrendSearch"
                            />
                            <Button variant="outline-secondary" id="googleTrendSearch" name="googleTrendSearch">Search</Button>
                        </InputGroup>
                        
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    </Col>
                    </Row>
                </Card>
            </Container>
        </Row>
    )
}

export default GoogleTrends; 