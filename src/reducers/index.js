import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading } from './posts'

export default combineReducers({
  posts,
  postsHasError,
  postsIsLoading
})
