import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading, postVoteScore } from './posts'
import { categories, categoriesHasError, categoriesIsLoading } from './categories'

const rootReducer = combineReducers({
  posts,
  postsHasError,
  postsIsLoading,
  postVoteScore,
  categories,
  categoriesHasError,
  categoriesIsLoading,

})


export default rootReducer
