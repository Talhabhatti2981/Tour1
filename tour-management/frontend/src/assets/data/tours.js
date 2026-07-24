import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import tourImg08 from "../images/tour-img08.jpg";

const tours = [
  {
    id: "01",
    title: "Hunza Valley",
    city: "Pakistan",
    distance: 300,
    address: 'Somewhere',
    price: 99,
    maxGroupSize: 10,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
       {
        name: "jhon doe",
        rating: 4.6,
      },
       {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Skardu",
    city: "Pakistan",
    distance: 400,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.2,
      },
       {
        name: "jhon doe",
        rating: 4.2,
      },
       {
        name: "jhon doe",
        rating: 4.2,
      },
       {
        name: "jhon doe",
        rating: 4.2,
      },
       {
        name: "jhon doe",
        rating: 4.2,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Fairy Meadows",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Swat Valley",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.5,
      },
       {
        name: "jhon doe",
        rating: 4.5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Neelum Valley",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.1,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Faisal Mosque",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.8,
      },
       {
        name: "jhon doe",
        rating: 4.8,
      },
       {
        name: "jhon doe",
        rating: 4.8,
      },
       {
        name: "jhon doe",
        rating: 4.8,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Mohenjo-daro",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Gwadar",
    city: "Pakistan",
    distance: 500,
     address: 'Somewhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
];

export default tours;
