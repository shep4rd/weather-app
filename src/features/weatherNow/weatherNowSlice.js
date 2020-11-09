import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ID = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const UNITS = process.env.REACT_APP_OPENWEATHERMAP_UNITS;

export const weatherNowSlice = createSlice({
  name: "[WEATHER NOW]",

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
} = weatherNowSlice.actions;

export const getWeatherNowForCity = (coord) => (dispatch) => {
  dispatch(loading());
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,daily&units=${UNITS}&appid=${API_ID}`
    )
    .then(
      (res) => {
        dispatch(succeeded(res.data.current));
      },
      (err) => {
        dispatch(failed(err.message));
      }
    );
};

export const getWeatherNowOnLoad = (coord) => (dispatch) => {
  dispatch(loading());
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,daily&units=${UNITS}&appid=${API_ID}`
    )
    .then(
      (res) => {
        dispatch(succeeded(res.data.current));
      },
      (err) => {
        dispatch(failed(err.message));
      }
    );

}

export const selectWeatherNow = (state) => state.weatherNow.data;
export const selectWeatherNowDate = (state) => state.weatherNow.data.dt;
export const selectWeatherNowStatus = (state) => state.weatherNow.status;

export default weatherNowSlice.reducer;
