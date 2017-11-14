import {
  COMMENTS_FETCH_SUCCESS,
  COMMENT_UPVOTE,
  COMMENT_DOWNVOTE,
  ADD_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  REMOVE_COMMENT_SUCCESS
 } from '../actions/comments'

export function comments (state = [], action) {

  const { id } = action
  let commentToUpdate, stateWithoutComment,
      score, comments, sortedCommentsByDate

  let _ = require('lodash')

  switch (action.type) {
    case COMMENTS_FETCH_SUCCESS:
      console.log("After fetching the comments in the reducer: ", action.comments)
      return comments = [
        ...action.comments
      ]
    case COMMENT_UPVOTE:
      stateWithoutComment = state.filter((comment) => comment.id !== id )
      commentToUpdate = state.find((comment) => comment.id === id)

      score = commentToUpdate.voteScore
      commentToUpdate.voteScore = score + 1

      comments = [
        commentToUpdate,
        ...stateWithoutComment
      ]

      sortedCommentsByDate = _.sortBy(comments, 'timestamp')

      return sortedCommentsByDate
    case COMMENT_DOWNVOTE:
      stateWithoutComment = state.filter((comment) => comment.id !== id )
      commentToUpdate = state.find((comment) => comment.id === id)

      score = commentToUpdate.voteScore
      commentToUpdate.voteScore = score - 1

      comments = [
        commentToUpdate,
        ...stateWithoutComment
      ]

      sortedCommentsByDate = _.sortBy(comments, 'timestamp')

      return sortedCommentsByDate
    case UPDATE_COMMENT_SUCCESS:
        return [
          ...state.filter((comment) => comment.id !== id ),
        ]
    case ADD_COMMENT_SUCCESS:
      return [
        ...state.concat(action.comment)
      ]
    case REMOVE_COMMENT_SUCCESS:
      return [
        ...state.filter((comment) => comment.id !== id )
      ]
    default:
      return state
  }
}
