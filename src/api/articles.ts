import type { AxiosResponse } from 'axios'
import api from './client'
import type { Article, ArticleInput } from '../types/article'

export const createArticle = (data: ArticleInput): Promise<AxiosResponse<Record<string, never>>> =>
  api.post('/article/', data)

export const listArticles = (limit: number, offset: number, status = ''): Promise<AxiosResponse<Article[]>> => {
  const params = status ? { status } : {}
  return api.get(`/article/${limit}/${offset}`, { params })
}

export const getArticle = (id: number | string): Promise<AxiosResponse<Article>> =>
  api.get(`/article/${id}`)

export const updateArticle = (id: number | string, data: ArticleInput): Promise<AxiosResponse<Record<string, never>>> =>
  api.put(`/article/${id}`, data)

export const deleteArticle = (id: number | string): Promise<AxiosResponse<Record<string, never>>> =>
  api.delete(`/article/${id}`)
