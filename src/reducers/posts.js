import {
  POSTS_HAS_ERROR,
  POSTS_IS_LOADING,
  POSTS_FETCH_SUCCESS,
  POST_UPVOTE,
  POST_DOWNVOTE,
  UPDATE_POST_SUCCESS,
  REMOVE_POST_SUCCESS,
  ADD_POST_SUCCESS,
  SORT_POSTS_BY_DATE_ASC,
  SORT_POSTS_BY_DATE_DSC,
  SORT_POSTS_BY_SCORE_ASC,
  SORT_POSTS_BY_SCORE_DSC
} from '../actions/posts'

// Remember a reducer takes in two things:
// 1. the action (info about what happened)
// 2. copy of current state

export function postsHasError(state = false, action) {
  switch (action.type) {
    case POSTS_HAS_ERROR:
     return action.hasError
    default:
      return state
  }
}

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function posts(state = [], action) {

  let _ = require('lodash')
  let sortedPosts = null

  // object destructuring from action
  const { id,  posts } = action

  // Declare some helper variables
  let postToUpdate, stateWithoutPost, score

  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return action.posts
    case POST_UPVOTE:
      console.log("Payload is:", action)
      stateWithoutPost = state.filter((post) => post.id !== id )
      postToUpdate = state.find((post) => post.id === id)

      score = postToUpdate.voteScore
      postToUpdate.voteScore = score + 1

      return[
        postToUpdate,
        ...stateWithoutPost
      ]
    case POST_DOWNVOTE:
      stateWithoutPost = state.filter((post) => post.id !== id )
      postToUpdate = state.find((post) => post.id === id)
      score = postToUpdate.voteScore
      postToUpdate.voteScore = score - 1
      return [
        postToUpdate,
        ...stateWithoutPost
      ]
    case UPDATE_POST_SUCCESS:
      return [
        ...state.filter((post) => post.id !== id ),
      ]
    case REMOVE_POST_SUCCESS:
      console.log(
        ...state.filter((post) => post.id !== id )
      )
      return [
        ...state.filter((post) => post.id !== id )
      ]
    case ADD_POST_SUCCESS:
      return [
        ...state.concat(action.post)
      ]
    case SORT_POSTS_BY_DATE_ASC:
        return sortedPosts = _.orderBy(posts, 'timestamp', 'asc')
    case SORT_POSTS_BY_DATE_DSC:
      console.log("Sort posts by date dsc reducer")
        return sortedPosts = _.orderBy(posts, 'timestamp', 'dsc').reverse()
    case SORT_POSTS_BY_SCORE_ASC:
        return sortedPosts = _.orderBy(posts, 'voteScore', 'asc')
    case SORT_POSTS_BY_SCORE_DSC:
      return sortedPosts = _.orderBy(posts, 'voteScore', 'dsc').reverse()
    default:
      return state
  }
}
