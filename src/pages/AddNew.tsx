import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { createArticle } from '../api/articles'
import type { ArticleInput } from '../types/article'

export default function AddNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (data: ArticleInput) => {
    setLoading(true)
    setApiError('')
    try {
      await createArticle(data)
      navigate('/')
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { errors?: Record<string, string> } } }
      const msg = axiosErr.response?.data?.errors
        ? Object.values(axiosErr.response.data.errors).join(', ')
        : 'Failed to save article.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Article</h1>
      {apiError && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">{apiError}</div>
      )}
      <ArticleForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
