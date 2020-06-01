import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import {
  CardHeader,
  Typography,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

class JobListingPage extends Component {
  state = {
    forms: [],
    isLoading: false,
    selectedEvent: null,
  };
  isActive = true;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchForms();
  }

  fetchForms() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            forms{
              _id
              title
              description
              salary
              
            }
          }
        `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const forms = resData.data.forms;
        console.log(forms);
        if (this.isActive) {
          this.setState({ forms: forms, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  openDetailPage(form_id) {
     console.log(form_id); 
  }

  openForm = (formId) => {
    console.log(formId);
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },

      card: {
        maxWidth: 800,
        maxheight: 400,
        width: 800,
      },
      cardrow: {
        border: "1px solid #000000",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      actions: {
        display: "flex",
      },

      expandOpen: {
        transform: "rotate(180deg)",
      },
      bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },

      mainheading: {
        fontWeight: 200,
        fontSize: 44,
        color: "#212121",
        marginBottom: "20px",
        fontFamily: '"Raleway", sans-serif',
      },
      mainsubheading: {
        fontWeight: 100,
        fontSize: 18,
        color: "#212121",
        fontFamily: '"Raleway", sans-serif',
        maxWidth: 700,
        marginBottom: "30px",
      },
    };

    return (
      <React.Fragment>
        <NavBar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          
          style={{ minHeight: "100vh", padding:"10px" }}
        >
          
          {this.state.forms.length == 0 ?
           <CircularProgress />  : 
           this.state.forms.map(form_item => (
            <Grid item xs={8}>
            <Card style={styles.card}>
              <CardHeader
                action={<Button style={{ padding: 10 }} onClick = {() => this.openDetailPage(form_item._id)}>Apply Now</Button>}
                title={form_item.title}
                subheader={form_item.salary + "  CTC"}
              />
              <CardContent>
                <Typography component="p" style={{ paddingTop: 5 }}>
                  {form_item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
           ))
           }
         </Grid>
      </React.Fragment>
    );
  }
}

export default JobListingPage;
