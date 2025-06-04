import { useState, useEffect } from 'react'
import MinimalButton from './MinimalButton'

interface Scene {
  index: number
  bg_prompt: string
  headline: string
  cta: string
}

interface SceneFormProps {
  initialScenes?: Scene[]
  onSubmit: (scenes: Scene[]) => void
  onBack?: () => void
}

export default function SceneForm({ initialScenes = [], onSubmit, onBack }: SceneFormProps) {
  const [scenes, setScenes] = useState<Scene[]>(
    initialScenes.length > 0 
      ? initialScenes 
      : [{ index: 1, bg_prompt: '', headline: '', cta: '' }]
  )

  useEffect(() => {
    if (initialScenes.length > 0) {
      setScenes(initialScenes)
    }
  }, [initialScenes])

  const updateScene = (index: number, field: keyof Omit<Scene, 'index'>, value: string) => {
    setScenes(prev => prev.map((scene, i) => 
      i === index ? { ...scene, [field]: value } : scene
    ))
  }

  const addScene = () => {
    setScenes(prev => [...prev, {
      index: prev.length + 1,
      bg_prompt: '',
      headline: '',
      cta: ''
    }])
  }

  const removeScene = (index: number) => {
    if (scenes.length > 1) {
      setScenes(prev => prev
        .filter((_, i) => i !== index)
        .map((scene, i) => ({ ...scene, index: i + 1 }))
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(scenes)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-light mb-8 text-gray-900">Design Your Scenes</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {scenes.map((scene, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Scene {scene.index}</h3>
              {scenes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScene(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Prompt
                </label>
                <input
                  type="text"
                  value={scene.bg_prompt}
                  onChange={(e) => updateScene(index, 'bg_prompt', e.target.value)}
                  placeholder="Describe the background..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={scene.headline}
                  onChange={(e) => updateScene(index, 'headline', e.target.value)}
                  placeholder="Enter headline..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call to Action
                </label>
                <input
                  type="text"
                  value={scene.cta}
                  onChange={(e) => updateScene(index, 'cta', e.target.value)}
                  placeholder="Enter CTA..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <MinimalButton onClick={addScene}>
            Add Scene
          </MinimalButton>
        </div>

        <div className="flex justify-between pt-4">
          {onBack && (
            <MinimalButton onClick={onBack}>
              Back
            </MinimalButton>
          )}
          <MinimalButton type="submit" variant="primary">
            Continue
          </MinimalButton>
        </div>
      </form>
    </div>
  )
} 