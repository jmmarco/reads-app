import React, { Component } from 'react'
import { fetchPosts } from './actions/posts'
import { connect } from 'react-redux'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

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

        <Header/>
        <Sidebar posts={this.props.posts}/>
        <Main posts={this.props.posts}/>

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
