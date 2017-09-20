import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Post from './Post'

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
                {/* <Route component={Post} post={post}/> */}

              </li>
            )

          })}
        </ul>
      </aside>
    )
  }
}

export default Sidebar
