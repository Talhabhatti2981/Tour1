

import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from './../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/Subtitle';


import SearchBar from "../shared/SearchBar";
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../Components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery
 from '../Components/Image-gallery/MasonryImagesGallery';

 import Testimonials from '../Components/Testimonial/Testimonials';
 import Newsletter from '../shared/Newsletter';





const Home = () => {
  return <>

  {/*======================hero section start===========================*/}
  <section>
    <Container>
      <Row>
        <Col lg="6">
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-item-center ">
           <Subtitle subtitle={"Know Before You Go"} />
            <img src={worldImg} alt="" />
          </div>
          <h1>Traveling opens the door to creating{" "}
             <span className="highlight">memories</span>
          </h1>
          <p>
            Traveling opens the door to unforgettable experiences.
            Discover breathtaking destinations and hidden gems around the Pakistan. Start your next adventure with confidence and ease.!
          </p>
        </div>
        </Col>
        <Col lg='2'>
        <div className="hero__img-box">
          <img src={heroImg} alt="" />
          </div>
          </Col>
          <Col lg='2'>
        <div className="hero__img-box hero__video-box mt-4">
          <video src={heroVideo} alt="" controls />
          </div>
          </Col>
          <Col lg='2'>
        <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="" />
          </div>
          </Col>

          <SearchBar />

      </Row>
    </Container>
  </section>
  {/*======================hero section End===========================*/}
  <section>
    <Container>
      <Row>
        <Col lg='3'>
        <h5 className="services__subtitle">What we serve</h5>
        <h2 className="services__title">We offer our best services</h2>
        </Col>
        <ServiceList />
      </Row>
    </Container>
  </section>
  {/*======================Featured tour Section Start===========================*/}

<section>
  <Container>
    <Row>
      <Col lg='12' className="mb-5">
      <Subtitle subtitle={'Explore'}/>
      <h2 className="featured__tour-title">Our featured tours</h2>
      </Col>
      <FeaturedTourList />
    </Row>
  </Container>
</section>


  {/*======================Featured tour Section End===========================*/}


  {/*======================experience Section Start===========================*/}

<section>
  <Container>
    <Row>
      <Col lg='6'>
      <div className="expreience__content">
        <Subtitle subtitle={'Experience'}/>
        <h2>With our all experience <br />we will serve you</h2>
        <p>Creating unforgettable journeys with trusted travel expertise. <br /> From dream destinations to seamless travel planning.</p>
      </div>
        <div className="counter__wrapper d-flex align-item-center gap-5">
          <div className="counter__box">
            <span>12k+</span>
            <h6>Successful Trip</h6>
          </div>
          <div className="counter__box">
            <span>2k+</span>
            <h6>Regular Clients</h6>
          </div>
          <div className="counter__box">
            <span>15</span>
            <h6>Year experience</h6>
          </div>
        </div> 
      </Col>
      <Col lg='6'>
      <div className="experience__img">
        <img src={experienceImg} alt="" />
      </div>
      </Col>
    </Row>
  </Container>
</section>



  {/*======================experience Section End===========================*/}



  {/*====================== gallery Section Start===========================*/}

<section>
  <Container>
    <Row>
      <Col lg='12'>
      <Subtitle subtitle={'Gallery'}/>
      <h2 className="gallery__title">Vist our Customers tour gallery</h2>
      </Col>
      <Col lg='12'>
      <MasonryImagesGallery/>
      </Col>
    </Row>
  </Container>
</section>




  {/*====================== gallery Section End===========================*/}

  {/*====================== Testimonial Section Start========================*/}

  <section>
    <Container>
      <Row>
        <Col lg='12'>
      <Subtitle subtitle={'Fans love'}/>
        <h2 className="testimonial__title"> What our fans say about us </h2>
        </Col>
        <Col lg='12'> 
        <Testimonials/>
        </Col>
      </Row>
    </Container>
  </section>

  {/*====================== Testimonial Section End===========================*/}

  {/*====================== Newslatter Section Start=========================*/}
    <Newsletter />

  {/*====================== Newslatter Section End===========================*/}





</>
};

export default Home
