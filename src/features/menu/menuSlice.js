import { createSlice } from "@reduxjs/toolkit";
import { getWeatherNowForCity } from "../weatherNow/weatherNowSlice";
import { getWeatherLongForCity } from "../weatherLong/weatherLongSlice";
import axios from "axios";

const API_ID = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const menuSlice = createSlice({
  name: "[MENU]",

  initialState: {
    citySearchPhrase: "",
    cityName: "Warsaw",
    coord: {
      lon: "21.01",
      lat: "52.23"
    },
    status: "idle",
    error: null,
  },

  reducers: {
    search: (state, action) => {
      state.citySearchPhrase = action.payload;
    },
    idle: (state) => {
      state.status = "idle";
    },
    loading: (state) => {
      state.status = "loading";
    },
    succeeded: (state, action) => {
      state.status = "succeeded";
      state.cityName = action.payload.name;
      state.coord.lon = action.payload.coord.lon;
      state.coord.lat = action.payload.coord.lat;
    },
    failed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  search,
  idle,
  loading,
  succeeded,
  failed
} = menuSlice.actions;

export const getCityCords = (cityName) => (dispatch) => {
  dispatch(loading());
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_ID}`
    )
    .then(
      (res) => {
        dispatch(succeeded(res.data));
        dispatch(getWeatherNowForCity(res.data.coord))
        dispatch(getWeatherLongForCity(res.data.coord))
      },
      (err) => {
        dispatch(failed(err.message));
      }
    );
};

export const selectCitySearchPhrase = (state) => state.menu.citySearchPhrase;
export const selectCityName = (state) => state.menu.cityName;
export const selectCoord = (state) => state.menu.coord;;

export default menuSlice.reducer;
