export interface PageInfo {
  endCursor: string | null
  startCursor: string | null
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface Jam {
  id: string
  userId: string
  place: string
  prefectureId: string
  description: string
  scheduleFor: string
  canceledAt: string
  createdAt: string
  updatedAt: string
  candidates?: [User]
}

export interface JamsConnection {
  pageInfo: PageInfo
  edges: { node: Jam }[]
}

export interface JamInputType {
  id?: number
  params: {
    prefectureId?: number
    description?: string
    place?: string
    scheduledFor?: string
  }
}

export interface User {
  id: string
  name: string
  nickname: string
  image: string
  description: string
  location: string
  createdAt: string
  updatedAt: string
}

export interface UserInputType {
  nickname: string
  description: string
  location: string
}
