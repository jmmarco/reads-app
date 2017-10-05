import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { downVote, upVote } from '../actions/posts'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'

class Post extends Component {


  render() {
    console.log(this.props)
    const { post } = this.props

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
            <button>Edit</button>
            <button>Remove</button>
            <span className="vote-control">
              <button onClick={this.props.upVote.bind(null, post)}><ArrowUp size={30}/></button>
              <button onClick={this.props.downVote.bind(null, post)}><ArrowDown size={30}/></button>
            </span>

          </div>
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

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
