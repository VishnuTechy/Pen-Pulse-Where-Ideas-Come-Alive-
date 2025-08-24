import PostForm from '../../../components/PostForm'

export default function CreatePost() {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          ✍️ Create a New Blog Post
        </h2>

        {/* Form */}
        <PostForm onSuccessPath="/" />
      </div>
    </div>
  )
}
