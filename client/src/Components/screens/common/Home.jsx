

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Toolbar } from "@mui/material";
import "./style.css";

const artCategories = [
  { path: "/botanic", label: "בוטני", image: "/images/categories/botanic.jpg" },
  { path: "/urban", label: "אורבני", image: "/images/categories/urban.jpg" },
  { path: "/modern-art", label: "אומנות מודרנית", image: "/images/categories/modern-art.png" },
  { path: "/abstract", label: "אבסטרקט", image: "/images/categories/abstract.webp" },
  { path: "/landscape", label: "נוף", image: "/images/categories/landscape.png" },
];


const sliderImages = [
  "/images/21.jpg",
  "/images/11.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
  "/images/16.jpg",
  "/images/17.jpg",
  "/images/18.jpg",
  "/images/25.jpg",
  "/images/26.jpg",
  "/images/27.jpg",
  "/images/28.jpg",
  "/images/29.jpg",
  "/images/30.jpg",
  "/images/31.jpg",
  "/images/32.jpg",
  "/images/33.jpg",
  "/images/34.jpg",
  "/images/35.jpg",
  "/images/36.jpg",
  "/images/37.jpg",
  "/images/38.jpg",
  "/images/39.jpg",
  "/images/40.jpg",
  "/images/41.jpg",
  "/images/19.jpg",
  "/images/20.jpg",
  "/images/22.jpg",
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/23.jpg",
  "/images/24.jpg",
  



];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 2000); // מחליף תמונה כל 5 שניות

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toolbar /> {/* רזרבה לגובה הניווט */}

      <Box className="home-container">
        {/* אזור התמונות הגדולות */}
        <Box className="slider-wrapper">
          {sliderImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`slider-image ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </Box>

        {/* אזור הקטגוריות */}
        <Box className="categories-section">
          <Typography variant="h4" className="categories-title" gutterBottom>
            קטגוריות
          </Typography>

          <Grid container spacing={10} justifyContent="center">
            {artCategories.map((category, index) => (
              <Grid item key={index}>
                <Link to={category.path} style={{ textDecoration: "none" }}>
                  <Box className="category-item">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="category-logo"
                    />
                  </Box>
                  <Typography className="category-label" variant="subtitle1">
                    {category.label}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
