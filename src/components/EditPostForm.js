import React, { Component } from 'react'


class EditPostForm extends Component {

  render() {
    const { post, handleSubmit, handleChange} =  this.props
    return(
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={post.value}
              onChange={handleChange}
              placeholder={post.title}
            />
          </label>
          <label>
            Body:
            <input
              type="text"
              name="body"
              value={post.value}
              onChange={handleChange}
              placeholder={post.body}
            />
          </label>
          <br/>
          <button type="submit">Submit Post</button>
          <button>Go Back</button>
        </form>
      </div>

    )

  }
}

export default EditPostForm
