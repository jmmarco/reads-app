import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { post } = this.props

    console.log("Post is: ", post)
    if (post !== undefined) {

      return (
        <div className="post-body">
          <h2>{post.title}</h2>
          <h3>Posted in category: {post.category}</h3>
          <p>{post.body}</p>
          <hr/>
          <p>Written by: <a href="">{post.author}</a> on: {new Date(post.timestamp).toLocaleString()}</p>

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
