import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BASE_IMAGE_URL } from '../../utils/environment';
//@ts-ignore
import classes from './index.module.css';

type Props = {
    imagesUrls: string[]
}

export default function CarouselComponent(props: Props) {
    const images = props.imagesUrls.map((imagePath) => {
        return (<div key={imagePath}>
            <img alt="image" src={BASE_IMAGE_URL(imagePath)} />
        </div>)
    })
    return (
        <div className={classes.CarouselContainer}>
            <Carousel>
                {images}
            </Carousel>
        </div>
    )
}
