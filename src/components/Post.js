import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { upVote, downVote } from '../actions/posts'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'

class Post extends Component {


  render() {
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
              <button><ArrowUp size={30}/></button>
              <button><ArrowDown size={30}/></button>
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

export default Post
