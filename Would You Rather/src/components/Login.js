import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Select, Grid, Header, Segment } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";
import { AUTHED_ID } from "../actions/shared";
import logo from '../logo.svg'

class Login extends Component {
  state = {
    value: "",
    redirectToReferrer: false
  };
  handleChange = (e, { value }) => this.setState({ value });
  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    this.props.dispatch(setAuthedUser(value));
    this.setState({ redirectToReferrer: true });
  };

  render() {
    const { userArray, authedUser } = this.props;
    const { value, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    if (authedUser !== AUTHED_ID) {
      return <Redirect to='/' />;
    }
    return (
      <Grid
        verticalAlign='middle'
        style={{ height: "100vh", justifyContent: "center" }}
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment>
              <Header as='h2'>Would You Rather App</Header>
              <img src={logo} className="App-logo" alt="logo" width="80" height="90"/> 
              <Header as='h3'>Please Sign In</Header>
              <Form.Field>
                <Select
                  placeholder='Select User'
                  onChange={this.handleChange}
                  options={userArray}
                />
              </Form.Field>
              <Form.Button color='blue' disabled={value === ""} type='submit'>
                Login
              </Form.Button>
            </Segment>
            <footer className="footer">
              <a href="https://img.icons8.com">
                Avatar characters created by icons8 - img.icons8.com
              </a>
          </footer>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  // format user data for select box
  const userOptions = Object.keys(users).map(user => {
    return {
      key: users[user].id,
      text: users[user].name,
      value: users[user].id
    };
  });
  return {
    userArray: userOptions,
    authedUser
  };
}

export default connect(mapStateToProps)(Login);
