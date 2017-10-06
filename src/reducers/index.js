import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading } from './posts'
import { categories, categoriesHasError, categoriesIsLoading } from './categories'

export default combineReducers({
  categories,
  categoriesHasError,
  categoriesIsLoading,
  postsHasError,
  postsIsLoading,
  posts,

})
