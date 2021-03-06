import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import { withRouter, Link } from 'react-router-dom'

class AddPostForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post: {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: ''
      },
      saving: false
    }

    this.updatePostState = this.updatePostState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.savePost = this.savePost.bind(this)
  }


  updatePostState(event) {
    const field = event.target.name
    const post = this.state.post

    post[field] = event.target.value

    this.setState({ post: post })
  }

  handleChange(event) {

    const post = this.state.post
    post['category'] = event.target.value

    this.setState({
      post: post  })
  }


  savePost(event) {
    const {history} =  this.props
    event.preventDefault()
    this.props.addPost(this.state.post, history)
    this.setState({
      saving: true
    })
  }

  render() {
    return (
      <div>
        <h2>New post</h2>
        <form onSubmit={this.savePost}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={this.state.value}
              placeholder="Something interesting"
              onChange={this.updatePostState}
            />
          </label>
          <br/>
          <label>
            Body:
            <input
              type="text"
              name="body"
              value={this.state.value}
              placeholder="There was once..."
              onChange={this.updatePostState}
            />
          </label>
          <br/>
          <label>
            Name:
            <input
              type="text"
              name="author"
              value={this.state.value}
              placeholder="Name goes here"
              onChange={this.updatePostState}
            />
          </label>
          <br/>
          <label>
            Choose from an available category:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option defaultValue="udacity">udacity</option>
            </select>
          </label>
          <br/>
          <button type="submit">Submit Post</button>
          <Link className="link-button" to="/">Go Back</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return  {
    // empty for now
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data, history) => dispatch(addPost(data, history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostForm))
