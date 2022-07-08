export interface Jam {
  id: string
  place: string
  prefectureId: string
  description: string
  scheduleFor: string
  canceledAt: string
  createdAt: string
  updatedAt: string
}

export interface JamInputType {
  params: {
    prefectureId?: number
    description?: string
    place?: string
    scheduledFor?: string
  }
}
