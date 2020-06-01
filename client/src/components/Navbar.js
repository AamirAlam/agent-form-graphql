import React, { Component } from "react";
import { Toolbar, IconButton, AppBar, Typography, Button } from "@material-ui/core";

class NavBar extends Component {
    render() {
        return (
            <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" >
      RentZend :     in network Agent applications
    </Typography>
   
  </Toolbar>
</AppBar>
        );
    }
}

export default NavBar;