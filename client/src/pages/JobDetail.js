import React, { Component } from 'react';
import {Text}  from 'react';
import { Card, CircularProgress, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, Grid, TextField, Button, Box } from '@material-ui/core';
import NavBar from '../components/Navbar';

class JobDetailPage extends Component {
  state = {
    form: null,
    isLoading: false,
    selectedEvent: null,
    name: "",
    email: "",
    phone: "",
    photo: "",
    document: ""
  };
  isActive = true;

  
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  

  componentDidMount() {
    const { state } = this.props.history.location;
    this.fetchFormByID(state.id);
  }

  fetchFormByID(id) {

    console.log("fetching form by "+ id)
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query{
        getFormById(id: "${id}") {
          title
          description
          role
          salary
          
        }
      }
        `
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res)
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const formData = resData.data.getFormById;
        console.log(formData);
        if (this.isActive) {
          this.setState({ form: formData, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  handleFormSubmit() {
    console.log(this.state)
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        <NavBar/>
        {
    this.state.form == null || this.state.form == undefined ?
     <CircularProgress/> : 
     <Grid container  
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     style={{ minHeight: "50vh", padding:"10px" }}>
     <Grid item xs={12}>
       <form>
         <Grid item xs={12}>
           <Typography
             gutterBottom
             variant="title"
           >
             {this.state.form.title}
           </Typography>
         </Grid>
         <Grid item >
           <TextField
             label="Full Name"
             handleChange={this.handleChange("name")}
             value={this.state.name}
             type="text"
           />
         </Grid>
         <Grid item >
           <TextField
             label="Email address"
             handleChange={this.handleChange("email")}
             value={this.state.email}
           />
         </Grid>
         <Grid item >
           <TextField
             label="Phone"
             handleChange={this.handleChange("phone")}
             value={this.state.phone}
           />
         </Grid>
         <Box m={2} />
         <label>Uplaod your photo</label>
         <Grid item >
           <TextField
             type ="file"
             value={this.state.photo}
             handleChange={this.handleChange("photo")}
           />
          
         </Grid>
         <Box m={2} />
         <label>Uplaod your document</label>
         <Grid item >
           <TextField
             type ="file"
             value={this.state.document}
             handleChange={this.handleChange("photo")}
           />
         </Grid>
         <Box m={2} />
         <Grid item >
           <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Submit application</Button>
         </Grid>
       </form>
     </Grid>
   </Grid>
    }
      </React.Fragment>
    );
  }
}

export default JobDetailPage;
