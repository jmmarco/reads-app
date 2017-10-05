import React, { Component } from 'react'
import { fetchPosts} from './actions/posts'
import { fetchCategories } from './actions/categories'
import { connect } from 'react-redux'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import './App.css';



class App extends Component {

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
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
        <Sidebar posts={this.props.posts} categories={this.props.categories}/>
        <Main posts={this.props.posts} categories={this.props.categories}/>

      </div>

    );
  }
}


// we're going to map Redux's state and the dispatching of our action creator to props.
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    hasError: state.postsHasError,
    isLoading: state.postsIsLoading,
    categories: state.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (url) => dispatch(fetchPosts(url)),
    fetchCategories: (url) => dispatch(fetchCategories(url))
  }
}

// Before:
// export default App
// After:
export default connect(mapStateToProps, mapDispatchToProps)(App)
