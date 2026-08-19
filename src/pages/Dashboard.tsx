import { useState, useEffect, useCallback } from 'react'
import PostTable from '../components/PostTable'
import { listArticles, updateArticle, getArticle } from '../api/articles'
import type { Article } from '../types/article'

const TABS = [
  { key: 'publish', label: 'Published' },
  { key: 'draft',   label: 'Drafts' },
  { key: 'trash',  label: 'Trashed' },
] as const

const PAGE_SIZE = 10

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('publish')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchArticles = useCallback(async (status: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await listArticles(PAGE_SIZE, 0, status)
      setArticles(res.data || [])
    } catch {
      setError('Failed to load articles.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArticles(activeTab)
  }, [activeTab, fetchArticles])

  const handleTrash = async (article: Article) => {
    try {
      const res = await getArticle(article.id)
      const current = res.data
      await updateArticle(article.id, {
        title: current.title,
        content: current.content,
        category: current.category,
        status: 'trash',
      })
      fetchArticles(activeTab)
    } catch {
      alert('Failed to move article to trash.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Posts</h1>
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-6">
        <ul className="flex flex-wrap -mb-px overflow-x-auto">
          {TABS.map(({ key, label }) => (
            <li key={key} className="me-2">
              <button
                onClick={() => setActiveTab(key)}
                className={
                  activeTab === key
                    ? 'inline-block p-4 text-primary-500 border-b-2 border-primary-500 rounded-t-lg'
                    : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <PostTable
          articles={articles}
          onTrash={handleTrash}
          loading={loading}
          isTrashTab={activeTab === 'trash'}
        />
      </div>
    </div>
  )
}
