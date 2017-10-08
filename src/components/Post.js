import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatePost, downVote, upVote, deletePost } from '../actions/posts'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'
// import EditPostForm from './EditPostForm'

class Post extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isDeleted: false,
      value: '',
      post: null
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post
    })

  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  handleChange(event) {
    const field = event.target.name
    const post = this.state.post

    post[field] = event.target.value

    return this.setState({
      post: post
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updatePost(this.state.post)
    this.setState({
      isEditing: false
    })

  }

  handleRemove(event) {
    // Make call to action here
    this.props.deletePost(this.state.post)
    this.setState({
      isDeleted: true
    })
  }


  render() {
    const { post } = this.props



    if (this.state.isEditing && post !== undefined) {
      return (
        <div>
          <h2>Edit Post</h2>

          {/* TODO: Figure out how to bind the onSubmit function
          to a component */}

          {/* <EditPostForm
            post={post}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          /> */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={post.value}
                onChange={this.handleChange}
                placeholder={post.title}
              />
            </label>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      )
    }

    if (post !== undefined) {

      return (
        <div className="post-body">
          <h2>{post.title}</h2>
          <h3>Posted in category: <Link to={`/categories/${post.category}`}>{post.category}</Link></h3>
          <p>{post.body}</p>

          <hr/>
          <p>Written by: <a href="">{post.author}</a> on: {new Date(post.timestamp).toLocaleString()}</p>
          <p>Score: {post.voteScore}</p>

          <div className="controls">
            <button onClick={this.toggleEdit}>Edit</button>
            <button onClick={this.handleRemove}>Remove</button>
            <span className="vote-control">
              <button onClick={this.props.upVote.bind(null, post)}><ArrowUp size={30}/></button>
              <button onClick={this.props.downVote.bind(null, post)}><ArrowDown size={30}/></button>
            </span>

          </div>
        </div>
      )
    }

    if (this.state.isDeleted) {
      return (
        <div>
          <p>Post has been deleted!</p>
        </div>
      )
    }

    // If no post is found just fill in with some text
    return (
      <div>
        <p>Nothing loaded!</p>
      </div>
    )


  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    post: ownProps.post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
