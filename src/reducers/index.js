import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading, postVoteScore } from './posts'
import { categories, categoriesHasError, categoriesIsLoading } from './categories'

export default combineReducers({
  posts,
  postsHasError,
  postsIsLoading,
  postVoteScore,
  categories,
  categoriesHasError,
  categoriesIsLoading,

})
