import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import AddPostForm from './AddPostForm'
import { fetchComments } from '../actions/comments'
import { connect } from 'react-redux'


class Main extends Component {

  // state = {
  //   comments: []
  // }
  //
  // componentWillReceiveProps() {
  //   if (this.props.posts.length >  0) {
  //     // console.log(this.props.posts)
  //     const { posts } = this.props
  //     console.log("fired")
  //     posts.forEach((post) => this.props.fetchComments)
  //   }
  // }



  render() {
    const posts = this.props.posts
    const categories = this.props.categories



    return(

        <main className="content">

          <Route exact={true} path={`/`} render={() => (
            <div>


              { posts.map((post, i) => {
                return (
                  <Post key={i} post={post}/>

                )
              })}



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



// function mapDispatchToProps (dispatch) {
//   return {
//     fetchComments: (data) => dispatch(fetchComments(data))
//   }
// }

export default Main
