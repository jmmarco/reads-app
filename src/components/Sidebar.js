import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <h2>Posts Listing</h2>
        <ul className="posts-list">
          {this.props.posts.map((post) => {
            return (
              <li key={post.id}>

                <Link to={`/posts/${post.id}`}>{post.title}</Link>

              </li>
            )

          })}
        </ul>
      </aside>
    )
  }
}

export default Sidebar
