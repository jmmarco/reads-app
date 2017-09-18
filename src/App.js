import React, { Component } from 'react'
import { fetchPosts } from './actions/posts'
import { connect } from 'react-redux'
import './App.css';

class App extends Component {

  componentDidMount() {
    console.log("fired")

    this.props.fetchPosts()
  }


  render() {
    if (this.props.hasError) {
      return <p>Sorry! An error has occurred.</p>
    }

    if (this.props.areLoading) {
      return <p>Loading...</p>
    }

    return (
      <div className="app">
        <header className="app-header">
          <h1>My Reads App</h1>
        </header>

        <div className="content">
          <h2>Posts Collection</h2>
          <p>{console.log(this.props.posts)}</p>
          <ul className="posts-list">
            {this.props.posts.map((post) => {
              return (
                <li key={post.id}>
                  <a href="">{post.title}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

    );
  }
}


// we're going to map Redux's state and the dispatching of our action creator to props.
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    hasError: state.postsHasError,
    isLoading: state.postsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (url) => dispatch(fetchPosts(url))
  }
}

// Before:
// export default App
// After:
export default connect(mapStateToProps, mapDispatchToProps)(App);
