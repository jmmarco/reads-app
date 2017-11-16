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
       order: false,
       type: '',
       option: '',
     }

   }


   toggleSort(option) {

     const { order } = this.state
     const { posts } = this.props

     if (!order && option === 'date') {
       this.setState({ order: true, type: 'asc', option: option })
       this.props.sortPostsByDateAsc(posts)
     }

     if (order && option === 'date') {
       this.setState({ order: false, type: 'dsc', option: option })
       this.props.sortPostsByDateDsc(posts)
     }

     if (!order && option === 'score') {
       this.setState({ order: true, type: 'asc', option: option })
       this.props.sortPostsByScoreAsc(posts)
     }

     if (order && option === 'score') {
       this.setState({ order: false, type: 'dsc', option: option })
       this.props.sortPostsByScoreDsc(posts)
     }

   }

   render() {
       return (
         <div>
           <button className="button-post" onClick={() => this.toggleSort('score')}>Sort by score</button>
           <button className="button-post" onClick={() => this.toggleSort('date')}>Sort by date</button>
           {this.state.type === 'asc' && this.state.option === 'date' ? <span>Posts sorted by date in ascending order</span>
           : this.state.type === 'dsc' && this.state.option === 'date' ? <span>Posts sorted by date in descending order</span>
           : this.state.type === 'asc' && this.state.option === 'score' ? <span>Posts sorted by score in ascending order</span>
           : <span>Posts sorted by score in descending order</span> }

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
