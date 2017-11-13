import { api, headers } from '../utils/ReadbleAPI'

export const COMMENTS_FETCH_SUCCESS = 'COMMENTS_FETCH_SUCCESS'
export const COMMENT_UPVOTE = 'COMMENT_UPVOTE'
export const COMMENT_DOWNVOTE = 'COMMENT_DOWNVOTE'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS'

const uuid = require('uuid/v1')

// I need action creators
export function commentsFetchSuccess(comments) {
  return {
    type: COMMENTS_FETCH_SUCCESS,
    comments
  }
}

export function commentUpVote(comment) {
  return {
    type: COMMENT_UPVOTE,
    voteScore: comment.voteScore,
    id: comment.id
  }
}

export function commentDownVote(comment) {
  return {
    type: COMMENT_DOWNVOTE,
    voteScore: comment.voteScore,
    id: comment.id
  }
}

export function addCommentSuccess(comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment
  }
}

export function removeCommentSuccess(id) {
  return {
    type: REMOVE_COMMENT_SUCCESS,
    id: id
  }
}

export function updateCommentSuccess(comment) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    comment
  }
}


// API Stuff
export function fetchComments(id) {
  console.log("Fetching Comments!")
  return (dispatch) => {
    fetch(`${api}/posts/${id}/comments`, {
      headers,
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((comments) => {
      dispatch(commentsFetchSuccess(comments))
    })
    .catch((error) => {
      console.log("Something went wrong when fetching comments: ", error)
    })
  }
}

export function upVote(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
           option: "upVote"
         })
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      dispatch(commentUpVote(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with upVote: ", error)
    })
  }

}

export function downVote(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
           option: "downVote"
         })
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      dispatch(commentDownVote(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with downvote: ", error)
    })
  }

}

export function updateComment(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify({
           timestamp: Date.now(),
           body: comment.body
         })
    })
    .then((comment) => {
      return comment.json()
    })
    .then((comment) => {
      dispatch((updateCommentSuccess(comment)))
    })
    .catch((error) => {
      console.log("Something went wrong with updating comment")
    })
  }
}

export function addComment(comment, history) {
  return (dispatch) => {
    fetch(`${api}/comments`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
           id: uuid(),
           timestamp: Date.now(),
           body: comment.body,
           author: comment.author,
           parentId: comment.parentId
         })
    })
    .then((response) => {
      return response.json()
    })
    .then((comment) => {
      // history.push(`/comments/${comment.id}`) <-- this won't work properly
      dispatch(addCommentSuccess(comment))
    })
    .catch((error) => {
      console.log("Something went wrong with addComment: ", error)
    })
  }
}

export function deleteComment(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, {
      headers,
      method: 'DELETE',
    })
    .then((response) => {
      return response
    })
    .then((response) => {
      dispatch(removeCommentSuccess(comment.id))
    })
    .catch((error) => {
      console.log("Something went wrong with removing comment")
    })
  }
}
