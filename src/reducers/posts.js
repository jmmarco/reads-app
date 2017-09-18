export function postsHasError(state = false, action) {
  switch (action.type) {
    case 'POSTS_HAS_ERROR':
     return action.hasError
    default:
      return state
  }
}

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSTS_IS_LOADING':
      return action.isLoading
    default:
      return state
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case 'POSTS_FETCH_SUCCESS':
      return action.posts
    default:
      return state
  }
}
