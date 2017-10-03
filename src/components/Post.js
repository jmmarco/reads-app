import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {downVote, upVote} from '../actions/posts'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'

class Post extends Component {

  upVote = () => {
    console.log("fired upvote", this.props.post)
    upVote(this.props.post)
  }


  downVote = (e) => {
    // e.preventDefault()
    console.log("fired downvote", this.props.post)
    downVote(this.props.post)

  }

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
              <button onClick={this.upVote}><ArrowUp size={30}/></button>
              <button onClick={this.downVote}><ArrowDown size={30}/></button>
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
