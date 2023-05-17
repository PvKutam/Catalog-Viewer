import React, { useState, useEffect, useRef } from "react";
import { Card, CardMedia, CardContent, IconButton,Box } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import image from "./image";
import { styled } from "@mui/material";
import "./Page.css";

const Imgs = styled(Card)`
padding:4rem;
width:90%;
height:90%;
display:flex;
gap:2rem;
min width:30%;
border-bottom: 0rem;


`;
const Slide = styled(Box)`
display:flex;
justify-content: space-between;
margin-right: 14rem;


`;

const Medias = styled(CardMedia)`
  height: 48rem;
  width: 48rem;
  border-radius: 2rem;
`;
const Btn = styled(IconButton)`
  position: relative;
  background: white;
  color: #25beda;
  bottom:60%
  right: 40%;
  border-radius: 0%;
  border: none;
  
  
`;

const Play = styled(PlayCircleOutlineIcon)`
  width: 7rem;
  height: 7rem;
  height: "2.813rem";
  margintop: "1.25rem";
  border-radius: 0%;
  border: none;  
  padding:0 2rem; 
  

`;
const Pause = styled(PauseCircleFilledIcon)`
  width: 7rem;
  height: 7rem;
  height: "2.813rem";
  margintop: "1.25rem";
  border-radius: 0%;
  border: none;
  padding:0 2rem; 
  

`;

const CatalogViewer = () => {
  const [images, setImages] = useState(image);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const slideshowTimerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      startSlideshow();
    } else {
      stopSlideshow();
    }

    return () => {
      stopSlideshow();
    };
  }, [isPlaying]);

  const startSlideshow = () => {
    slideshowTimerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  const stopSlideshow = () => {
    clearInterval(slideshowTimerRef.current);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <>
      <Imgs>
        <Medias
          component="img"
          alt={images[currentIndex]?.title}
          src={images[currentIndex]?.imageUrl}
        />
        <CardContent>
          <p>{images[currentIndex]?.details}</p>
        </CardContent>
        
      </Imgs>

      <Slide>
      <div>
        <ul>
          <IconButton onClick={handlePrevious}>
            <ArrowBackIosNewIcon  />
          </IconButton>
          {images.map((image, index) => (
            <li key={index}>
              <img
                src={image.thumbnailUrl}
                alt={image.title}
                style={{
                  filter: index === currentIndex ? "none" : "grayscale(100%)",
                  border: index === currentIndex ? "2px solid blue" : "none",
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            </li>
          ))}
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ul>
      </div>
      <Btn onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</Btn>
      </Slide>
    </>
  );
};

export default CatalogViewer;
