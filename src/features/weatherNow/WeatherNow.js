import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Divider } from '@material-ui/core';
import { 
  getWeatherNowOnLoad,
  selectWeatherNow, 
  selectWeatherNowStatus 
} from './weatherNowSlice';
import { selectCoord } from '../menu/menuSlice';
import { useSelector } from 'react-redux';

export function WeatherNow() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherNow);
  const status = useSelector(selectWeatherNowStatus);
  const coord = useSelector(selectCoord);
  
  useEffect( () => {
    if (status === 'idle') {
      dispatch(getWeatherNowOnLoad(coord));
    } 
  }, [status, coord, dispatch]);


  return (
    <>
      { (status === 'succeeded') ?
        <Grid container className="Section">
          <Grid item xs={12}>
            <Typography align='center' variant='h4' gutterBottom>
            {weatherData.weather[0].description} 
            </Typography> 
          </Grid>

          <Grid item xs={8}>
            <Typography
              align='center'
              variant='h2'
              >
              {weatherData.temp.toFixed(0)}&deg;C
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant='h6'
              >
              min {weatherData.temp.toFixed(0)}&deg;C
            </Typography>
            <Divider light></Divider>
            <Typography
              variant='h6'          
              >
              max {weatherData.temp.toFixed(0)}&deg;C
            </Typography>
          </Grid>
        
          <Grid item grid={12} >
            <Typography>
              Pressure: {weatherData.pressure} hPa
            </Typography>
            <Typography>
              Humidity: {weatherData.humidity}%
            </Typography>
            <Typography>
              Wind speed: {weatherData.wind_speed} m/s
            </Typography>
            <Typography>
              Clouds: {weatherData.clouds}
            </Typography>
          </Grid>
        </Grid>
      : <Typography>Loading...</Typography>
      }
    </>
  );
}