import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {
  render() {
    const { category, posts } = this.props
    if (category !== undefined) {
      return (
        <div>
          <h2>These are all the posts in the {category.name} category</h2>

          <ul className="list">
            { posts.map((p) => {
              return (
                <li key={p.id}>
                  <Link to={`/posts/${p.id}`}>{p.title}</Link>
                </li>
              )
            })

            }
          </ul>
        </div>
      )
    }

    // If undefined render something at least
    return (
      <div>
        <p>No Category loaded!</p>
      </div>
    )


  }
}

export default Category
