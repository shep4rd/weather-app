import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import weatherLongReducer from '../features/weatherLong/weatherLongSlice';
import weatherNowReducer from '../features/weatherNow/weatherNowSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    weatherLong: weatherLongReducer,
    weatherNow: weatherNowReducer,
  },
});
