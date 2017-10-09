import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: null,
      order: true,
    }

    this.toggleSort = this.toggleSort.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({
      posts: this.props.posts
    })
  }


  toggleSort(type) {
    let posts = this.state.posts
    let _ = require('lodash')



    let sortedPosts = null

    if (type === 'score') {
      switch (this.state.order) {
        case true:
        sortedPosts = _.orderBy(posts, 'voteScore', 'asc')
        this.setState({ order: false  })
        break
        default:
        sortedPosts = _.orderBy(posts, 'voteScore', 'desc')
        this.setState({ order: true })
      }
    }

    if (type === 'date') {
      switch (this.state.order) {
        case true:
        sortedPosts = _.orderBy(posts, 'timestamp', 'asc')
        this.setState({ order: false  })
        break
        default:
        sortedPosts = _.orderBy(posts, 'timestamp', 'desc')
        this.setState({ order: true })
      }
    }

    // Finally, set the state
    this.setState({
      posts: sortedPosts
    })
  }


  render() {
    const { category } = this.props
    const posts = this.state.posts

    if (category !== undefined && posts!== null) {
      return (
        <div>
          <h2>These are all the posts in the {category.name} category</h2>

          <ul className="list">
            { posts.map((p) => {
              return (
                <li key={p.id}>
                  <Link to={`/posts/${p.id}`}>{p.title} </Link>

                  <span>- Score: {p.voteScore} | Date: {new Date(p.timestamp).toDateString()}</span>
                </li>
              )
            })

            }
          </ul>
          <hr/>
          <button className="button-sort" onClick={() => this.toggleSort('score')}>Sort by score</button>
          <button className="button-sort" onClick={() => this.toggleSort('date')}>Sort by date</button>

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
