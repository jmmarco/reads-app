import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import AddPostForm from './AddPostForm'
import SortPosts from './SortPosts'


class Main extends Component {


  render() {
    const posts = this.props.posts
    const categories = this.props.categories

    return(

        <main className="content">

          <Route exact={true} path={`/`} render={() => (
            <div>

              <h2 className="section-heading">Posts List View</h2>
              <hr/>
              <SortPosts/>



              { posts.map((post, i) => {
                return (
                  <Post key={i} post={post}/>

                )
              })}



            </div>
          )}/>


          <Route path={`/posts/new`} component={AddPostForm}/>




          { posts && (
            <Route path={`/posts/:postId`} render={({ match }) => (

              <Post post={posts.find(p => p.id === match.params.postId )}/>

            )}/>
          )}

          { posts && categories && (
            <Route path={`/:categoryName/posts`} render={({ match }) => (
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
