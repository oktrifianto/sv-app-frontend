import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { getArticle, updateArticle } from '../api/articles'
import type { Article, ArticleInput } from '../types/article'

export default function EditArticle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    if (!id) return
    getArticle(id)
      .then((res) => setArticle(res.data))
      .catch(() => setFetchError('Article not found.'))
      .finally(() => setLoadingData(false))
  }, [id])

  const handleSubmit = async (data: ArticleInput) => {
    if (!id) return
    setSaving(true)
    setApiError('')
    try {
      await updateArticle(id, data)
      navigate('/')
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { errors?: Record<string, string> } } }
      const msg = axiosErr.response?.data?.errors
        ? Object.values(axiosErr.response.data.errors).join(', ')
        : 'Failed to update article.'
      setApiError(msg)
    } finally {
      setSaving(false)
    }
  }

  if (loadingData) {
    return <div className="py-12 text-center text-gray-400 text-sm">Loading…</div>
  }

  if (fetchError) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-red-500 text-sm">{fetchError}</div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Article</h1>
      {apiError && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">{apiError}</div>
      )}
      <ArticleForm initialData={article ?? undefined} onSubmit={handleSubmit} loading={saving} />
    </div>
  )
}
