import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'
import { withRouter } from 'react-router-dom'

class AddCommentForm extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    console.log("this.props is: ", this.props)
    this.state = {
      comment: {
        id: '',
        timestamp: '',
        body: '',
        author: '',
        parentId: this.props.post.id
      }
    }

    this.updateCommentState = this.updateCommentState.bind(this)
    this.saveComment = this.saveComment.bind(this)
  }

  updateCommentState(event) {
    const field = event.target.name
    const comment = this.state.comment

    comment[field] = event.target.value

    return this.setState({ comment: comment })
  }

  saveComment(event) {
    const {history} =  this.props
    event.preventDefault()

    // Call the addComment action
    this.props.addComment(this.state.comment, history)

    // toggleAddComment to change the state of the parent component
    this.props.toggleAddComment()


  }


  render() {

    return (
      <div className="comments-box">
        <h2>New Comment</h2>
        <form onSubmit={this.saveComment}>
          <label>
            Body:
            <input
              type="text"
              name="body"
              value={this.state.value}
              placeholder="This post is soo intersting..."
              onChange={this.updateCommentState}
            />
          </label>
          <br/>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={this.state.value}
              placeholder="Your name goes here"
              onChange={this.updateCommentState}
            />
          </label>
          <br/>
          {/* <input type="submit" value="Submit"/> */}
          <button className="button-comment" type="submit">Save Comment</button>
        </form>
        <button className="button-comment" onClick={this.props.toggleAddComment}>Cancel</button>
      </div>
    )


  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data, history) => dispatch(addComment(data, history)),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCommentForm))
