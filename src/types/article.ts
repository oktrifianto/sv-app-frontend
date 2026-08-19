export interface Article {
  id: number
  title: string
  content: string
  category: string
  status: 'publish' | 'draft' | 'trash'
  created_date: string
  updated_date: string
}

export interface ArticleInput {
  title: string
  content: string
  category: string
  status: string
}

// if complex will be using zod or react-hook-form
export interface ValidationErrors {
  [field: string]: string
}
