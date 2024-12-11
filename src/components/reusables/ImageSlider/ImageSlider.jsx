import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from "react-slick";

import './image_slider.css';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      }
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
