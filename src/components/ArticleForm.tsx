import { useState } from 'react'
import { validateArticle, hasErrors } from '../utils/validation'
import type { ArticleInput, ValidationErrors } from '../types/article'

interface ArticleFormProps {
  initialData?: Partial<ArticleInput>
  onSubmit: (data: ArticleInput, status: string) => void
  loading?: boolean
}

export default function ArticleForm({ initialData = {}, onSubmit, loading = false }: ArticleFormProps) {
  const [fields, setFields] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    category: initialData.category || '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      // delete command used for removing the error from the errors object
      setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n })
    }
  }

  const handleSubmit = (status: string) => {
    const data: ArticleInput = { ...fields, status }
    const errs = validateArticle(data)
    if (hasErrors(errs)) {
      setErrors(errs)
      return
    }
    setErrors({})
    onSubmit(data, status)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-primary-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={fields.title}
          onChange={handleChange}
          placeholder="Article title (min. 20 characters)"
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 ${
            errors.title ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-primary-500">*</span>
        </label>
        <input
          type="text"
          name="category"
          value={fields.category}
          onChange={handleChange}
          placeholder="e.g. Technology"
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 ${
            errors.category ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-primary-500">*</span>
        </label>
        <textarea
          name="content"
          value={fields.content}
          onChange={handleChange}
          rows={10}
          placeholder="Article content (min. 200 characters)"
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-y ${
            errors.content ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.content
            ? <p className="text-xs text-red-500">{errors.content}</p>
            : <span />}
          <span className="text-xs text-gray-400">{fields.content.length} chars</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleSubmit('publish')}
          disabled={loading}
          className="px-6 py-2 rounded-md bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving…' : 'Publish'}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={loading}
          className="px-6 py-2 rounded-md bg-white text-gray-700 border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving…' : 'Draft'}
        </button>
      </div>
    </div>
  )
}
