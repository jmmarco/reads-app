import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

  render() {
    console.log(this.props)
    return (

      <aside className="sidebar">
        <h2>Posts Listing</h2>
        <ul className="list">
          {this.props.posts.map((post) => {
            return (
              <li key={post.id}>

                <Link to={`/posts/${post.id}`}>{post.title}</Link>

              </li>
            )

          })}
        </ul>
        <hr/>
        <h2>Categories Listing</h2>
        <ul className="list">
          {this.props.categories.map((category, i) => {

            return (
              <li key={i}>
                <Link to={`/${category.path}/posts`}>{category.name}</Link>
              </li>
            )
          })}

        </ul>
      </aside>
    )
  }
}

export default Sidebar
