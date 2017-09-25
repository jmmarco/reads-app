import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'

class Post extends Component {

  upVote = (e) => {
    e.preventDefault()
    console.log("Upvote was clicked!")
  }

  downVote = (e) => {
    e.preventDefault()
    console.log("Downvote was clicked!")
  }

  render() {
    const { post } = this.props

    console.log("Post is: ", post)
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
