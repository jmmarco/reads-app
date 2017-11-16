import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import AddCommentForm from './AddCommentForm'
import EditPostForm from './EditPostForm'
import { updatePost, downVote, upVote, deletePost } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash'

class Post extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isDeleted: false,
      value: '',
      post: null,
      isAddingComment: false,
      isAddingPost: false,
      commentsLoaded: false
    }

    this.toggleAddComment = this.toggleAddComment.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }


  componentDidMount() {
    this.setState({post: this.props.post})
  }

  toggleAddComment() {
    this.setState({
      isAddingComment: !this.state.isAddingComment
    })
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  toggleAddPost() {
    this.setState({
      isAddingPost: !this.state.isAddingPost
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
    const { post, comments } = this.props

    if (this.state.isEditing && post !== null) {
      return (
        <EditPostForm
          post={post}
          handleSubmit={this.handleSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
      )
    }

    if (post !== undefined && post !== null) {
      // console.log(post)
      return (
        <div className="post">
          <div className="post-body">
            <Link to={`/:category/${post.id}`}> <h2>{post.title}</h2> </Link>
            <h3>Posted in category: <Link to={`/categories/${post.category}`}>{post.category}</Link></h3>
            <p>{post.body}</p>

            <p>Written by: <a href="">{post.author}</a> on: {new Date(post.timestamp).toLocaleString()}</p>
            <p>Score: {post.voteScore}</p>

            <div className="controls">
              <button onClick={this.toggleEdit}><Edit size={30}/></button>
              <button onClick={this.handleRemove}><Trash size={30}/></button>
              <span className="vote-control">
                <button onClick={() => this.props.upVote(post)}><ArrowUp size={30}/></button>
                <button onClick={() => this.props.downVote(post)}><ArrowDown size={30}/></button>
              </span>
            </div>
          </div>


          <div className="post-comments">

            { !this.state.isAddingComment && post && (
              <Comment comments={comments} post={post} toggleAddComment={this.toggleAddComment.bind(this)}/>
            )}

            { this.state.isAddingComment && post && (
              <AddCommentForm post={post} toggleAddComment={this.toggleAddComment.bind(this)}/>
            )}
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
    comments: state.comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    fetchComments: (data) => dispatch(fetchComments(data))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
