export interface BookCriticalInfo {
  key: string
  title: string
  first_publish_year: number
  author_name: string[]
  author_key: number[]
  cover_i: number
}

export interface BookCriticalInfoClient {
  key: string
  title: string
  publish: number
  author: string
  authorId: string
  cover?: number
}
