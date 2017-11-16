import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import {
  sortPostsByDateAsc,
  sortPostsByDateDsc,
  sortPostsByScoreAsc,
  sortPostsByScoreDsc
 } from '../actions/posts'

class Category extends Component {

  constructor(props) {
    super(props)
    this.state = {
      order: false
    }


  }


  toggleSort(option) {

    const { order } = this.state
    const { posts } = this.props

    if (!order && option === 'date') {
      this.setState({ order: true })
      this.props.sortPostsByDateAsc(posts)
    }

    if (order && option === 'date') {
      this.setState({ order: false })
      this.props.sortPostsByDateDsc(posts)
    }

    if (!order && option === 'score') {
      this.setState({ order: true })
      this.props.sortPostsByScoreAsc(posts)
    }

    if (order && option === 'score') {
      this.setState({ order: false })
      this.props.sortPostsByScoreDsc(posts)
    }

  }

  render() {
    const { category, posts } = this.props


    if (category !== undefined && posts !== undefined) {
      return (
        <div>

          <h2 className="section-heading">
            These are all the posts in the <span className="underline">{category.name}</span> category
          </h2>

          <button className="button-post" onClick={() => this.toggleSort('score')}>Sort by score</button>
          <button className="button-post" onClick={() => this.toggleSort('date')}>Sort by date</button>

          <hr/>
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


function mapDispatchToProps (dispatch) {
  return {
    sortPostsByDateAsc: (data) => dispatch(sortPostsByDateAsc(data)),
    sortPostsByDateDsc: (data) => dispatch(sortPostsByDateDsc(data)),
    sortPostsByScoreAsc: (data) => dispatch(sortPostsByScoreAsc(data)),
    sortPostsByScoreDsc: (data) => dispatch(sortPostsByScoreDsc(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Category)
