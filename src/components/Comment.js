import React, { Component } from 'react'
import { fetchComments, upVote, downVote } from '../actions/comments'
import { connect } from 'react-redux'
import ArrowUp from 'react-icons/lib/fa/arrow-circle-o-up'
import ArrowDown from 'react-icons/lib/fa/arrow-circle-o-down'

class Comment extends Component {

componentDidMount() {
  console.log(this.props.post)
  const { post } = this.props
  this.props.fetchComments(post.id)
}




  render() {
    console.log(this.state)
    console.log(this.props)

    const { comments } = this.props

    if (this.props.comments) {
      return (
        <div>
          <h3>Comments</h3>
          <ul className="list comments-box">
            { comments.map((comment, i) => {
              return (
                <li key={i} className="comment">
                  <p>{comment.body}</p>
                  <p>Score: {comment.voteScore} | Date: {new Date(comment.timestamp).toDateString()}</p>
                  <div className="comment-control">
                    <button
                      className="button-comment"
                      onClick={() => this.props.upVote(comment)}>
                      <ArrowUp size={25}/>
                    </button>
                    <button
                      className="button-comment"
                      onClick={() => this.props.downVote(comment)}>
                      <ArrowDown size={25}/>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    if (this.props.comments === undefined) {
      return (
        <div>
          Sorry, no comments for this post yet!
        </div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  console.log("State from Comment Component is: ", state)
  return {
    comments: state.comments
  }
}



function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
