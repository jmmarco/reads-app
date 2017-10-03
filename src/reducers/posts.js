import {
  POSTS_HAS_ERROR,
  POSTS_IS_LOADING,
  POSTS_FETCH_SUCCESS,
  POST_UPVOTE
} from '../actions/posts'


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
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return action.posts
    default:
      return state
  }
}

export function voteScore(state= [], action) {
  switch (action.type) {
    case POST_UPVOTE:
      const {cheese} = action
      console.log(cheese)
      return {}
    default:
      return state
  }
}
