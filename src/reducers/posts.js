import {
  POSTS_HAS_ERROR,
  POSTS_IS_LOADING,
  POSTS_FETCH_SUCCESS,
  POST_UPVOTE,
  POST_DOWNVOTE,
  UPDATE_POST_SUCCESS
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

  // object destructuring from action
  const { id } = action

  // console.log(action)
  // console.log(id, voteScore)

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
      console.log("Payload is:", action)
      console.log(
        "HEllo",
        // ...state.find((post) => post.id === id),
      )
      console.log(
        "hello below is: ",
        ...state.filter((post) => post.id !== id ),
        "hello above is: ",
        // Object.assign({}, action.post)

      )
      return [
        ...state.filter((post) => post.id !== id ),
        // Object.assign({}, action.post)
      ]
    default:
      return state
  }
}

// export function voteScore(state= [], action) {
//   switch (action.type) {
//     case POST_UPVOTE:
//       return {...state, voteScore: action.voteScore}
//     case POST_DOWNVOTE:
//       return {...state, voteScore: action.voteScore}
//     default:
//       return state
//   }
// }
