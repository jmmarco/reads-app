import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Post from './Post'
import Home from './Home'

class Main extends Component {
  render() {
    const posts = this.props.posts

    console.log(this.props.posts)

    return(
      <main className="content">
        <Route exact path={`/`} component={Home}/>

        { posts && (
          <Route path={`/posts/:postId`} render={({ match }) => (
            <Post post={posts.find(p => p.id === match.params.postId )}/>
          )}/>
        )}

      </main>
    )
  }
}

export default Main
