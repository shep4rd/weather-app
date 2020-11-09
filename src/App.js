import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { Menu } from './features/menu/Menu';
import { Header } from './features/header/Header';
import { WeatherNow } from './features/weatherNow/WeatherNow';
import { WeatherLong } from './features/weatherLong/WeatherLong';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Paper elevation={3} className="Weather">
          <Grid container> 
            <Header />           
            <Switch>
              <Route exact path="/now" component={WeatherNow} />
              <Route exact path="/long" component={WeatherLong} />
              <Route path="/">
                Welcome in the weather App, open menu to see more options or search for weather.
              </Route>
            </Switch> 
          </Grid>
        </Paper>
      </BrowserRouter>
    </div>
  );
}

export default App;
