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

export interface Entry {
  id: string
  jamId: string
  userId: string
  createdAt: string
  updatedAt: string
}
