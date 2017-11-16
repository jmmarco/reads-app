import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  sortPostsByDateAsc,
  sortPostsByDateDsc,
  sortPostsByScoreAsc,
  sortPostsByScoreDsc
 } from '../actions/posts'

 class SortPosts extends Component {

   constructor(props) {
     super(props)
     this.state = {
       order: false
     }


   }


   toggleSort(option) {

     const { order } = this.state
     const { posts } = this.props

     if (!order && option === 'date') {
       this.setState({ order: true })
       this.props.sortPostsByDateAsc(posts)
     }

     if (order && option === 'date') {
       this.setState({ order: false })
       this.props.sortPostsByDateDsc(posts)
     }

     if (!order && option === 'score') {
       console.log('sort by score asc')
       this.setState({ order: true })
       this.props.sortPostsByScoreAsc(posts)
     }

     if (order && option === 'score') {
       console.log('sort by score dsc')
       this.setState({ order: false })
       this.props.sortPostsByScoreDsc(posts)
     }

   }

   render() {
       return (
         <div>
           <button className="button-post" onClick={() => this.toggleSort('score')}>Sort by score</button>
           <button className="button-post" onClick={() => this.toggleSort('date')}>Sort by date</button>
         </div>
       )
     }
 }

 const mapStateToProps = (state, ownProps) => {
   return {
     posts: state.posts
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


 export default connect(mapStateToProps, mapDispatchToProps)(SortPosts)
