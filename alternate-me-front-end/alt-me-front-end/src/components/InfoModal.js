import React from 'react'; 
import Modal from 'react-bootstrap/Modal'; 


const InfoModal = () => {


    return(
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Conceptual Info on Fear and Greed Index
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Key Metric Information</h4>
                <p>
                    The Fear and Greed Index is a measurement calculated by five major indicators.<br/>
                    1.<h5>Volatility</h5><br/>
                    <p>Meausres the current volatility and maximum drawdowns of Bitcoin while comparing it<br/>
                    to average values o the last 30 and 90 days. 
                    </p>
                </p>
            </Modal.Body>
        </Modal>
    )
}

export default InfoModal; 