import React from 'react'
import { BrowserRouter } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';



const Navigation = () => {
    return (

        <>
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
            <Nav>
            <Nav.Link href="/" >Dashboard</Nav.Link>
            <Nav.Link href="/airdrop" >Airdrops</Nav.Link>
            <Nav.Link href="/nft" >NFT</Nav.Link>
            <Nav.Link href="/googletrends" >GoogleTrends</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>

    )
}

export default Navigation