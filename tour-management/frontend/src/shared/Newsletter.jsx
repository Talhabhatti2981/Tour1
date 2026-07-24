import React from 'react'
import './newsletter.css'

import { Container,Row,Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const Newsletter = () => {
  return (
  <section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
            <div className="newsletter__content">
                <h2>Subscribe now to get travelling information.</h2>

                <div className="newsletter__input">
                    <input type="email" placeholder='Enter Your email' />
                    <buutton className="btn newsletter__btn">Subscribe</buutton>
                </div>
                <p>Have Questions? We're Here to Help. Reach out to our team for personalized travel assistance.</p>                
            </div>
            </Col>
            <Col lg='6'>
            <div className="newsletter__img">
                <img src={maleTourist} alt="" />
            </div>
            </Col>
        </Row>
    </Container>
  </section>
  )
}

export default Newsletter
