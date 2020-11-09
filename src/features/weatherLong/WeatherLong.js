import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import {
  getWeatherLongOnLoad,
  selectWeatherLong,
  selectWeatherLongStatus,
} from "./weatherLongSlice";
import { selectCoord } from "../menu/menuSlice";
import { useSelector } from "react-redux";
import { WeatherCard } from "./weatherCard/WeatherCard";

export function WeatherLong() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherLong);
  const status = useSelector(selectWeatherLongStatus);
  const coord = useSelector(selectCoord);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getWeatherLongOnLoad(coord));
    }
  }, [status, coord, dispatch]);

  return (
    <>
      {status === "succeeded" ? (
        <Grid container className="Section">
          {weatherData.daily.map((day) => {
            return (
              <WeatherCard key={day.dt} date={day.dt} temp={day.temp.day} />
            );
          })}
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}
