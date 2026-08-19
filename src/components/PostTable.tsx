import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Article } from '../types/article'

interface PostTableProps {
  articles: Article[]
  onTrash: (article: Article) => void
  loading: boolean
  isTrashTab?: boolean
}

export default function PostTable({ articles, onTrash, loading, isTrashTab = false }: PostTableProps) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">Loading…</div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">No articles found.</div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 w-1/2">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">
                  {article.title}
                </td>
                <td className="px-4 py-3">{article.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => navigate(`/edit/${article.id}`)}
                      title="Edit"
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    {!isTrashTab && (
                      <button
                        onClick={() => onTrash(article)}
                        title="Move to trash"
                        className="p-1.5 rounded-md text-primary-500 hover:bg-red-50 transition-colors"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">{article.title}</p>
            <p className="text-xs text-gray-500 mb-3">{article.category}</p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit/${article.id}`)}
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"
              >
                <EditIcon sx={{ fontSize: 16 }} /> Edit
              </button>
              {!isTrashTab && (
                <button
                  onClick={() => onTrash(article)}
                  className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-700"
                >
                  <DeleteIcon sx={{ fontSize: 16 }} /> Trash
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
