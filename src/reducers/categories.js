export function categoriesHasError(state = false, action) {
  switch (action.type) {
    case 'CATEGORIES_HAS_ERROR':
     return action.hasError
    default:
      return state
  }
}

export function categoriesIsLoading(state = false, action) {
  switch (action.type) {
    case 'CATEGORIES_IS_LOADING':
      return action.isLoading
    default:
      return state
  }
}

export function categories(state = [], action) {
  switch (action.type) {
    case 'CATEGORIES_FETCH_SUCCESS':
      return action.categories
    default:
      return state
  }
}
