import { useState } from 'react'
import { api } from '../services/api'

interface Session {
  session_id: string
  state: string
  started_at: string
}

interface Meta {
  scene_count: number
  theme: string
}

interface Scene {
  index: number
  bg_prompt: string
  headline: string
  cta: string
}

interface Preview {
  summary: string
  preview_url: string
}

export function useAdBuilder() {
  const [session, setSession] = useState<Session | null>(null)
  const [meta, setMeta] = useState<Meta | null>(null)
  const [scenes, setScenes] = useState<Scene[]>([])
  const [preview, setPreview] = useState<Preview | null>(null)

  async function start() {
    const response = await api.post('/start-session/')
    setSession(response.data)
  }

  async function submitMeta(metaData: Partial<Meta>) {
    const response = await api.post('/collect-meta/', metaData)
    setMeta(response.data.meta)
  }

  async function submitScenes(sceneData: any) {
    const response = await api.post('/collect-scenes/', sceneData)
    setScenes(response.data.scenes)
  }

  async function getPreview() {
    const response = await api.get('/preview/')
    setPreview(response.data)
  }

  async function confirm(action: string, data?: any) {
    const response = await api.post('/confirm/', { action, ...data })
    return response.data
  }

  return {
    session,
    meta,
    scenes,
    preview,
    start,
    submitMeta,
    submitScenes,
    getPreview,
    confirm
  }
} 