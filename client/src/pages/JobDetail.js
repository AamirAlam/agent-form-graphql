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

  onChange = e =>
  this.setState({
    [e.target.name]: e.target.value
  });
  
  onSubmit = e => {
    e.preventDefault();
    const request_payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      photo: this.state.photo,
      document: this.state.document,
    };
    console.log(request_payload)
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



  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    let errors={}
    const styles = {
      bullet: {
        // display: "inline-block",
        // margin: "0 2px",
        // transform: "scale(0.8)"
      },
      title: {
        // paddingTop: 10,
        // fontSize: 22,
        // color: "#000000"
      },
      pos: {
        // marginBottom: 12
      },
      textField: {
        marginLeft: 10,
        marginRight: 10,
        width: "90%",
        height: 50
      },
      button: {
        margin: 4,
        backgroundColor: "#ffffff"
      },
      buttonLogin: {
        margin: 4,
        backgroundColor: "#0078BB",
        color: "#ffffff"
      },
      buttonLoginDisabled: {
        margin: 4,
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        color: "rgba(0, 0, 0, 0.26)"
      },
      paper: {
        // textAlign: "center",
        // marginTop: 100,
        // overflow: "hidden",
        // padding: 10,
        // borderRadius: 7
      },
      formControl: {
        margin: 15,
        width: "95%"
      }
    };

    return (
      <div>
        <NavBar/>
        {
    this.state.form == null || this.state.form == undefined ?
     <CircularProgress/> : 
       <Grid container spacing={0}>
         <Grid item lg={4} sm={12} xs={12}></Grid>
         <Grid item lg={4} sm={12} xs={12}>

         <form autoComplete="off" className="text-center " onSubmit={this.onSubmit}>
          <div style={{ paddingTop: 50, paddingBottom: 100 }}>
                  <TextField
                      id="outlined-name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                      label="Name"
                      style={styles.textField}
                      margin="none"
                      autoComplete="name"
                    />
                    <TextField
                      id="outlined-name"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                      label="Email"
                      style={styles.textField}
                      margin="none"
                    />
            
                    <TextField
                      id="outlined-name"
                      name="phone"
                      type="number"
                      value={this.state.phone}
                      onChange={this.onChange}
                      error={errors.password}
                      label="Phone"
                      style={styles.textField}
                      margin="none"
                    />
                    <TextField
                      id="outlined-name"
                      name="photo"
                      type="file"
                      label="Photo"
                      value={this.state.photo}
                      onChange={this.onChange}
                      error={errors.photo}
                      style={styles.textField}
                      margin="none"
                    />

                    <TextField
                      id="outlined-name"
                      name="document"
                      type="file"
                      label="Document"
                      value={this.state.document}
                      onChange={this.onChange}
                      error={errors.document}
                      style={styles.textField}
                      margin="none"
                    />
             
                    <div className="m-b-lg" style={{ paddingTop: "10px" }}>
                      <Button variant="contained" onClick={this.onStepBackward} >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        value="submit"
                        type="submit"
                        name="submit"
                      >
                        Apply For agent
                      </Button>
                    </div>
          </div>
              
           
              </form>
         </Grid>
         <Grid item lg={4} sm={12} xs={12}></Grid>
       </Grid>   
    }
      </div>
    );
  }
}

export default JobDetailPage;
