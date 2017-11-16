import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import SortPosts from './SortPosts'

class Category extends Component {

  render() {
    const { category, posts } = this.props


    if (category !== undefined && posts !== undefined) {
      return (
        <div>

          <h2 className="section-heading">
            These are all the posts in the <span className="underline">{category.name}</span> category
          </h2>
          <hr/>
          <SortPosts/>
          <ul className="list">
            { posts.map((post, i) => {
              return (
                <li key={i}>

                  <Post post={post} />
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

const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  // console.log(ownProps)
  return {
    posts: ownProps.posts
  }
}





export default connect(mapStateToProps)(Category)
