// src/components/IntroSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './IntroSlider.module.css';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const IntroSlider = ({ onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div>
          <h2>Welcome to the Grocery App!</h2>
          <p>Discover fresh groceries delivered to your doorstep.</p>
        </div>
        <div>
          <h2>Wide Variety</h2>
          <p>Choose from a wide range of products available in our store.</p>
        </div>
        <div>
          <h2>Easy to Use</h2>
          <p>Enjoy a seamless shopping experience with our user-friendly app.</p>
        </div>
        <div>
          <h2>Special Offers</h2>
          <p>Stay updated with the latest deals and discounts.</p>
        </div>
      </Slider>
      <button className={styles.closeButton} onClick={onClose}>Get Started</button>
    </div>
  );
};

export default IntroSlider;
