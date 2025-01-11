import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Header, Button, Divider, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class QuestionListPage extends Component {
 
  render() {
    const {author, optionOne, optionTwo} = this.props.question;
    const { buttonText, users } = this.props
    return (
      <div>
        <Grid celled>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as='h3'>{users[author].name} asks:</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} divided>
            <Grid.Column width={4} verticalAlign='middle'>
              <Image style={{ borderRadius: '50%' }} src={users[author].avatarURL} />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={12}>
              <h3 color='blue'>Would You Rather</h3>
              <p>{optionOne.text}<br />
              <Divider horizontal>Or</Divider>
                {optionTwo.text}</p>
              <Link to={`/questions/${this.props.id}`}><Button color='blue' style={{ width: '100%' }}>{buttonText}</Button></Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


function mapStateToProps({users,questions, authedUser },ownProps){
  const question = questions[ownProps.id]
  const {buttonText} = ownProps

  return {
    question,
    authedUser,
    buttonText,
    users
  }
}

export default connect(mapStateToProps)(QuestionListPage)
