import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import { listArticles } from '../api/articles'
import type { Article } from '../types/article'

const PAGE_SIZE = 6

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function Preview() {
  const [articles, setArticles] = useState<Article[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    listArticles(PAGE_SIZE + 1, page * PAGE_SIZE, 'publish')
      .then((res) => {
        const data = res.data || []
        setHasMore(data.length > PAGE_SIZE)
        setArticles(data.slice(0, PAGE_SIZE))
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Blog Preview</h1>
      <p className="text-gray-500 text-sm mb-8">All published articles</p>

      {loading && (
        <div className="py-12 text-center text-gray-400 text-sm">Loading…</div>
      )}

      {!loading && articles.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">No published articles yet.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
          >
            <div className="h-1.5 bg-primary-500" />
            <div className="p-5 flex flex-col flex-1">
              <span className="inline-block text-xs font-medium text-primary-500 bg-primary-50 rounded-full px-2.5 py-0.5 mb-3 self-start">
                {article.category}
              </span>
              <h2 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-4 flex-1 mb-4">
                {article.content}
              </p>
              <p className="text-xs text-gray-400 mt-auto">
                {formatDate(article.created_date)}
              </p>
            </div>
          </article>
        ))}
      </div>

      {(articles.length > 0 || page > 0) && (
        <Pagination
          page={page}
          hasMore={hasMore}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}
    </div>
  )
}
