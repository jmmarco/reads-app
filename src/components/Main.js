import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import AddPostForm from './AddPostForm'
// import AddCommentForm from './AddCommentForm'



class Main extends Component {


  render() {
    const posts = this.props.posts
    const categories = this.props.categories


    return(

        <main className="content">

          <Route exact={true} path={`/`} render={() => (
            <div>
              <h2>Welcome</h2>
              <p>
                To get started choose from any of the posts or
                categories on the left sidebar..
              </p>
            </div>
          )}/>


          <Route exact={true} path={`/posts/new`} component={AddPostForm}/>




          { posts && (
            <Route exact path={`/posts/:postId`} render={({ match }) => (
              <Post post={posts.find(p => p.id === match.params.postId )}/>
            )}/>
          )}

          { posts && categories && (
            <Route exact path={`/:categoryName/posts`} render={({ match }) => (
              <Category
                category={categories.find(c => c.name === match.params.categoryName)}
                posts={posts.filter(p => p.category === match.params.categoryName )}
              />
            )}/>
          )}

        </main>


    )
  }
}

export default Main
