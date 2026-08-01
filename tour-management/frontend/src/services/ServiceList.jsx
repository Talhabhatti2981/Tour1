import React from 'react'
import ServicesCard from './ServicesCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
    {
     imgUrl: weatherImg,
     title: "Calculate Weather",
     desc: "Get accurate weather forecasts anytime, anywhere."
    },
    {
     imgUrl: guideImg,
     title: "Best Tour Guide",
     desc: "Discover the world with expert guides by your side."
    },
    {
     imgUrl: customizationImg,
     title: "Customization",
     desc: "Create personalized travel experiences tailored just for you."
    }
]

const ServiceList = () => {
  return <>
  {
    servicesData.map((item,index)=> 
        (<Col lg='3' md='6' sm='12' className="mb-4" key={index}>
            <ServicesCard item={item}/> 
            </Col>))
  }
  </>
};

export default ServiceList
