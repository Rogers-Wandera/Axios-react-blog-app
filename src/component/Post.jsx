import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <article className='post'>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
        </Link>
        <p>
            {
                post.body.length <= 35 ? post.body :
                `${post.body.slice(0,35)}...`
            }
            <Link to={`/post/${post.id}`}>read more</Link>
        </p>
    </article>
  )
}

export default Post