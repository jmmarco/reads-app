import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { post } = this.props
    console.log("Post is: ", post)
    if (post !== undefined) {
      return (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
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
