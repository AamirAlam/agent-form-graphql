import React, { Component } from 'react';
import {Text}  from 'react';

class FormPage extends Component {
  state = {
    forms: [],
    isLoading: false,
    selectedEvent: null
  };
  isActive = true;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.fetchForms();
  }

  fetchForms() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            forms {
              _id
              title
              description
              posted_at
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const forms = resData.data.forms;
        console.log(forms);
        if (this.isActive) {
          this.setState({ forms: forms, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  openForm = formId => {
    console.log(formId);
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
        <Text>Hello details page </Text>
      
    );
  }
}

export default FormPage;
