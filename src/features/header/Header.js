import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { selectWeatherNowDate } from '../weatherNow/weatherNowSlice';
import { selectCityName } from '../menu/menuSlice';
import { useSelector } from 'react-redux';

export function Header() {
  const cityName = useSelector(selectCityName);
  const weatherDate = useSelector(selectWeatherNowDate); 

  return (
    <Grid item xs={12} className="Section">
      <Typography
        align='center'
        variant='h3'
      >
        {cityName}
      </Typography>
      <Typography
        align='center'
        variant='body1'
      >
        { weatherDate === undefined
        ? Date().toString().slice(0,15)
        : Date(weatherDate).toString().slice(0,15)
        }
      </Typography>
    </Grid>
  );
}