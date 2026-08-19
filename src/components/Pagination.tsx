interface PaginationProps {
  page: number
  hasMore: boolean
  onPrev: () => void
  onNext: () => void
}

export default function Pagination({ page, hasMore, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>
      <span className="text-sm text-gray-500">Page {page + 1}</span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
