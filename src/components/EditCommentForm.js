import React, { Component } from 'react'

class EditCommentForm extends Component {


  render() {
    const { comment, handleSubmit, handleChange} =  this.props
    return(
    <div>
      <h3>Edit Comment</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Body:
          <input
            type="text"
            name="body"
            value={comment.value}
            onChange={handleChange}
            placeholder={comment.body}
          />
        </label>
        <br/>
        <button type="submit">Submit</button>
        <button>Go Back</button>
      </form>
    </div>
    )
  }
}

export default EditCommentForm
