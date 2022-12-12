import React from 'react'

const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit
}) => {
  return (
    <div className='NewPost'>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}  className='form'>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          required
          value={postTitle}
          id="title"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea 
          type="text" 
          value={postBody}
          id="body"
          required
          rows="5"
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button>Add post</button>
      </form>
    </div>
  )
}

export default NewPost