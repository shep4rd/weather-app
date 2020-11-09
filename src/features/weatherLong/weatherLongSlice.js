import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ID = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const UNITS = process.env.REACT_APP_OPENWEATHERMAP_UNITS;

export const weatherLongSlice = createSlice({
  name: "[WEATHER LONG]",

  initialState: {
    data: {},
    status: "idle",
    error: null,
  },

  reducers: {
    idle: (state) => {
      state.status = "idle";
    },
    loading: (state) => {
      state.status = "loading";
    },
    succeeded: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    failed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  idle,
  loading,
  succeeded,
  failed,
} = weatherLongSlice.actions;

export const getWeatherLongForCity = (coord) => (dispatch) => {
  dispatch(loading());
  console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly&units=${UNITS}&appid=${API_ID}`)
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly&units=${UNITS}&appid=${API_ID}`
    )
    .then(
      (res) => {
        dispatch(succeeded(res.data));
      },
      (err) => {
        dispatch(failed(err.message));
      }
    );

};

export const getWeatherLongOnLoad = (coord) => (dispatch) => {
  dispatch(loading());

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly&units=${UNITS}&appid=${API_ID}`
    )
    .then(
      (res) => {
        dispatch(succeeded(res.data));
      },
      (err) => {
        dispatch(failed(err.message));
      }
    );

}

export const selectWeatherLong = (state) => state.weatherLong.data;
export const selectWeatherLongStatus = (state) => state.weatherLong.status;

export default weatherLongSlice.reducer;
