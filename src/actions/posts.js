import { api, headers } from '../utils/ReadbleAPI'

export const POSTS_HAS_ERROR = 'POSTS_HAS_ERROR'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS'


export function postsHasError(bool) {
  return {
    type: POSTS_HAS_ERROR,
    hasError: bool
  }
}

export function postsIsLoading(bool) {
  return {
    type: POSTS_IS_LOADING,
    isLoading: bool
  }
}

export function postsFetchSuccess(posts) {
  return {
    type: POSTS_FETCH_SUCCESS,
    posts
  }
}


export function fetchPosts() {
  return (dispatch) => {
    fetch(`${api}/posts`, {headers})
      .then((response) => {
        if (!response.ok) {
          throw Error (response.statusText)
        }
        // Since an error occurred, dispatch the loading action (false)
        dispatch(postsIsLoading(false))
        return response
      })
      // If all goes well parse the response into a JSON format
      .then((response) => {
        let json = response.json()
        // console.log("JSON looks like this: ", json)
        return json
      })
      // Dispatch the the fetch success action
      .then((posts) => dispatch(postsFetchSuccess(posts)))
      .catch((error) => {
        // If something goes wrong dispatch the error action
        dispatch(postsHasError(true))
        console.log("Something went wrong..", error)
      })
  }
}


// Upvote function
// export function upVote(post) {
//   return (dispatch) => {
//     console.log("Dispatching..")
//
//     dispatch(postUpVote(post))
//     // fetch(`${api}/posts/${post.id}`, {
//     //   headers,
//     //   method: 'post',
//     //   body: JSON.stringify({
//     //        option: "upVote"
//     //      })
//     // })
//     // .then((response) => {
//     //   console.log("upVotePost response is: ", response)
//     //   return response.json()
//     // })
//     // .then((post) => {
//     //   dispatch(postUpVote(post))
//     // })
//     // .catch((error) => {
//     //   console.log("Upvoting went wrong..", error)
//     // })
//   }
// }


  // // Downvote function
  // export function downVote(post) {
  //
  //   return (dispatch) => {
  //     fetch(`${api}/posts/${post.id}`, {
  //       headers,
  //       method: 'post',
  //       body: JSON.stringify({
  //            option: "downVote"
  //          })
  //     })
  //     .then((post) => {
  //       console.log("Post after downvote API is: ", post.json())
  //       return post.json()
  //     })
  //     .then((post) => {
  //       dispatch(postDownVote(post))
  //     })
  //     .catch((error) => {
  //       console.log("Something went wrong with downvote: ", error)
  //     })
  //   }
  //
  // }
