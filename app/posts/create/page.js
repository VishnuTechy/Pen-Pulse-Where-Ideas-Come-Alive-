import PostForm from '../../../components/PostForm'

export default function CreatePost() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <PostForm onSuccessPath="/" />
    </div>
  )
}
