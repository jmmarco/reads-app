import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import Home from './Home'
import addPostForm from './addPostForm'

class Main extends Component {
  render() {
    const posts = this.props.posts
    const categories = this.props.categories

    return(
      <main className="content">
        <Route exact path={`/`} component={Home}/>

        { posts && (
          <Route path={`/posts/:postId`} render={({ match }) => (
            <Post post={posts.find(p => p.id === match.params.postId )}/>
          )}/>
        )}

        { posts && categories && (
          <Route path={`/:categoryName/posts`} render={({ match }) => (
            <Category
              category={categories.find(c => c.name === match.params.categoryName)}
              posts={posts.filter(p => p.category !== match.params.categoryName )}
            />
          )}/>
        )}

        <Route exact path={`/posts`} component={addPostForm}/>
        
      </main>
    )
  }
}

export default Main
