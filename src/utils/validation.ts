import type { ValidationErrors } from '../types/article'

const VALID_STATUSES = ['publish', 'draft', 'trash'] as const

interface ValidateInput {
  title: string
  content: string
  category: string
  status?: string
}

export function validateArticle({ title, content, category, status }: ValidateInput): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!title || title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (title.trim().length < 20) {
    errors.title = 'Title must be at least 20 characters'
  }

  if (!content || content.trim().length === 0) {
    errors.content = 'Content is required'
  } else if (content.trim().length < 200) {
    errors.content = 'Content must be at least 200 characters'
  }

  if (!category || category.trim().length === 0) {
    errors.category = 'Category is required'
  } else if (category.trim().length < 3) {
    errors.category = 'Category must be at least 3 characters'
  }

  if (status !== undefined) {
    if (!status || status.trim().length === 0) {
      errors.status = 'Status is required'
    } else if (!(VALID_STATUSES as readonly string[]).includes(status)) {
      errors.status = 'Status must be one of: publish, draft, trash'
    }
  }

  return errors
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}
