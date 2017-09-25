import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading } from './posts'
import { categories, categoriesHasError, categoriesIsLoading } from './categories'

export default combineReducers({
  posts,
  postsHasError,
  postsIsLoading,
  categories,
  categoriesHasError,
  categoriesIsLoading
})
