import { useState } from 'react'
import MinimalButton from './MinimalButton'

interface Meta {
  scene_count: number
  theme: string
}

interface MetaFormProps {
  onSubmit: (meta: Meta) => void
  onBack?: () => void
}

export default function MetaForm({ onSubmit, onBack }: MetaFormProps) {
  const [sceneCount, setSceneCount] = useState(3)
  const [theme, setTheme] = useState('playful')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ scene_count: sceneCount, theme })
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-light mb-8 text-gray-900">Configure Your Ad</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="sceneCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Scenes
          </label>
          <input
            type="number"
            id="sceneCount"
            value={sceneCount}
            onChange={(e) => setSceneCount(parseInt(e.target.value))}
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="playful">Playful</option>
            <option value="professional">Professional</option>
            <option value="elegant">Elegant</option>
            <option value="bold">Bold</option>
          </select>
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