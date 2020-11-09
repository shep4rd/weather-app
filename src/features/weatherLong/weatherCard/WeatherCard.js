import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Grid, Typography } from '@material-ui/core';

const Card = styled(Grid)`
  padding: 5px 10px;
  margin: 4px 2px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff33;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export function WeatherCard(props) {
  const date = new Date(props.date*1000)

  return (
    <Card container>
      <Grid item xs={6}>
        <Typography align='left' variant='h6'>
          {date.toString().slice(0,10)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align='right' variant='h6'>
          {props.temp.toFixed(0)}&deg;C
        </Typography>
      </Grid>
    </Card>
  );
}

WeatherCard.propTypes = {
  date: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired
}

