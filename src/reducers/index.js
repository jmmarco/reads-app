import { combineReducers } from 'redux'
import { posts, postsHasError, postsIsLoading } from './posts'
import { comments } from './comments'
import { categories, categoriesHasError, categoriesIsLoading } from './categories'

export default combineReducers({
  categories,
  categoriesHasError,
  categoriesIsLoading,
  postsHasError,
  postsIsLoading,
  posts,
  comments,
})
