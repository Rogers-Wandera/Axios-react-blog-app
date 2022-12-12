import React from 'react'
import Post from './Post'

const Feed = ({posts}) => {
  return (
    <div>
        {
            posts.map((post) => {
                return <Post key={post.id} post={post}/>
            })
        }
    </div>
  )
}

export default Feed