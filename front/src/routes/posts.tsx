import useFetch,{ CachePolicies } from 'use-http'
import Post from '../components/post';
import Container from '@mui/material/Container';
import PostForm, { NewPostData } from '../components/post-form';
import { useEffect, useState } from 'react'
import { useAuth } from '../auth-context';
import CssBaseline from '@mui/material/CssBaseline';

export default function SignUpRoute() {
  const [posts, setPosts] = useState([])
  const { token } = useAuth()
  const { get, post, delete: deletePost, response, loading, error } = useFetch('/api/post', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cachePolicy: CachePolicies.NETWORK_ONLY
  })
  

  useEffect(() => { initializePosts() }, [])

  const initializePosts = async () => {
    const initialPosts = await get()
    if (response.ok) setPosts(initialPosts)
  }

  const handleSubmitNewPost = async (newPostData: NewPostData) => {
    
    await post(newPostData)
    
    if (response.ok) {
      const newPosts = await get()
      if (response.ok) setPosts(newPosts)
    } else {
      console.log('error')
    }
  };

  const handleDeletePost = async (id: number) => {
    
    await deletePost(`${id}`)
    
    if (response.ok) {
      const newPosts = await get()
      if (response.ok) setPosts(newPosts)
    } else {
      console.log('error')
    }
  };

  if (error) {
    return (
        <div>error</div>
      )
  }

  if (loading) {
    return (
        <div>loading</div>
      )
  }

  return  <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {token && <PostForm onSubmit={handleSubmitNewPost}/>}
      {posts.reverse().map((post: any, index: number) => (
        <Post
          id={post.id}
          key={index}
          title={post.title}
          username={post.username}
          date={post.date}
          body={post.content}
          onDeleteClicked={handleDeletePost}
        />
      ))}
    </Container>
  </>
}
