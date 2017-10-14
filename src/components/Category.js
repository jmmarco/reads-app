import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
    console.log("Option is :", option)
    const { order } = this.state
    const { posts } = this.props

    if (!order && option === 'date') {
      console.log("order false, option 'date'")
      this.setState({ order: true })
      this.props.sortPostsByDateAsc(posts)
    }

    if (order && option === 'date') {
      console.log("order true, option 'date'")
      this.setState({ order: false })
      this.props.sortPostsByDateDsc(posts)
    }

    if (!order && option === 'score') {
      console.log("order false, option 'score'")
      this.setState({ order: true })
      this.props.sortPostsByScoreAsc(posts)
    }

    if (order && option === 'score') {
      console.log("order is true and option is 'score'")
      this.setState({ order: false })
      this.props.sortPostsByScoreDsc(posts)
    }

  }

  render() {
    // console.log(this.props)
    // console.log(this.state)
    const { category, posts } = this.props


    if (category !== undefined && posts !== null) {
      return (
        <div>
          <h2>These are all the posts in the {category.name} category</h2>

          <ul className="list">
            { posts.map((post, i) => {
              return (
                <li key={i}>
                  <Link to={`/posts/${post.id}`}>{post.title} </Link>

                  <span>- Score: {post.voteScore} | Date: {new Date(post.timestamp).toDateString()}</span>
                </li>
              )
            })

            }
          </ul>
          <hr/>
          <button className="button-post" onClick={() => this.toggleSort('score')}>Sort by score</button>
          <button className="button-post" onClick={() => this.toggleSort('date')}>Sort by date</button>

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

const mapStateToProps = (state) => {
  // console.log(state  )
  return {
    // Nothing for now
    // posts: this.props
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
