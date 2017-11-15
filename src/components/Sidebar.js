import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions/comments'
import { connect } from 'react-redux'

class Sidebar extends Component {

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   this.props.fetchComments(nextProps.post.id)
  // }

  render() {

    return (

      <aside className="sidebar">
        <Link className="add-post-button" to={`/posts/new`}>Add post</Link>
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

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(mapDispatchToProps)(Sidebar)
