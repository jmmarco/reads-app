import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class Sidebar extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      post: null,
      isAdding: false
    }

    // this.handleAdd = this.handleAdd.bind(this)
  }


  // handleAdd() {
  //   alert("You clicked on add a new post")
  //   this.props.addPost()
  //   this.setState({
  //     isAdding: true
  //   })
  // }

  render() {

    return (

      <aside className="sidebar">
        <h2>Posts Listing</h2>
        <ul className="list">
          {this.props.posts.map((post, i) => {
            return (
              <li key={i}>

                <Link to={`/posts/${post.id}`}>{post.title}</Link>

              </li>
            )

          })}
        </ul>
        {/* <button onClick={this.handleAdd}>Add post</button> */}
        <Link className="add-post-button" to={`/posts/new`}>Add post</Link>
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

// const mapStateToProps = (state) => {
//   // console.log(state)
//   return {
//     posts: state.posts
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     addPost: (data) => dispatch(addPost(data))
//   }
// }

export default Sidebar
