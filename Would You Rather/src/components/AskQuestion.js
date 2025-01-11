import React, { Component } from 'react'
import { Form, Header, Divider, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { handleAskQuestion } from '../actions/questions';
import { withRouter } from 'react-router-dom';


class AskQuestion extends Component {
  state={
    optionOneText: '',
    optionTwoText: ''
  }
  handleChange = (e) => {
    const option = e.target.name;
    this.setState(({
      [option]: e.target.value
    }));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch, authedUser, history} = this.props
    const author = authedUser;
    const {optionOneText, optionTwoText} = this.state;
    dispatch(handleAskQuestion({optionOneText,optionTwoText,author}))
    .then(() => {history.push('/')})


  }
  render() {
    const IsDisabled = this.state.optionOneText !== '' && this.state.optionTwoText !== '';
    return (
      <div className='ui text container'>
      <Segment>
      <Header as="h3" textAlign="left" block attached="top">
          Create a New Poll
      </Header>
      <h2>Would You Rather...  (Complete the Question):</h2>
        <Form onSubmit={this.handleSubmit} style={{maxWidth: '450px', margin: '0 auto'}}>
          <Form.Input 
            label='First Option' 
            name='optionOneText'
            placeholder='Enter option one ...' 
            onChange={this.handleChange}
            value={this.state.optionOneText}
           />
          <Divider horizontal>Or</Divider>
          <Form.Input 
          label='Second Option'
          name='optionTwoText'
          placeholder='Enter option two ...'
          onChange={this.handleChange}
          value={this.state.optionTwoText}
          />
          <Form.Button color='blue' disabled={!IsDisabled}>Submit</Form.Button>
        </Form>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(AskQuestion))