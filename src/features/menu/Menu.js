import React, { useState } from 'react';
import { IconButton, InputBase, Paper, Drawer, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { search, selectCitySearchPhrase, getCityCords } from './menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Menu.css';

export function Menu() {
  const dispatch = useDispatch();
  const citySearchPhrase = useSelector(selectCitySearchPhrase);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Paper component="form" className="Root">
      <IconButton 
        className="MenuButton" 
        aria-label="menu"
        onClick={() => handleDrawerOpen()}>
        <MenuIcon />
      </IconButton>
      <InputBase
        className="Input"
        placeholder="Search Weather Api"
        inputProps={{ 'aria-label': 'search weather api' }}
        onChange={(event) => dispatch(search(event.target.value))}
      />
      <IconButton 
        className="SearchButton" 
        aria-label="search"
        onClick={() => {
          dispatch(getCityCords(citySearchPhrase))
        }}
      >
        <SearchIcon />
      </IconButton>
        <Drawer
          anchor="left"
          onEscapeKeyDown={handleDrawerClose}
          onBackdropClick={handleDrawerClose}
          open={open}
          classes={{
            paper: "DrawerPaper",
          }}
        >
          <div>
            <IconButton onClick={handleDrawerClose}>
              x
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText inset>
                <Link to={"/"}>Home</Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText inset>
                <Link to={"/now"}>Weather Now</Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText inset>
                <Link to={"/long"}>Weather Long</Link>
              </ListItemText>
            </ListItem>    
          </List>
        </Drawer> 
    </Paper>
  );
}