import { useState } from 'react'
import MinimalButton from './MinimalButton'

interface Scene {
  index: number
  bg_prompt: string
  headline: string
  cta: string
}

interface ConfirmPaneProps {
  scenes: Scene[]
  onApprove: () => void
  onEdit: (sceneIndex?: number) => void
  onBack?: () => void
  isLoading?: boolean
}

export default function ConfirmPane({ scenes, onApprove, onEdit, onBack, isLoading = false }: ConfirmPaneProps) {
  const [selectedScene, setSelectedScene] = useState<number | undefined>()

  const handleEdit = () => {
    onEdit(selectedScene)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-light mb-8 text-gray-900">Confirm Your Ad</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Final Review</h3>
        <div className="space-y-4">
          {scenes.map((scene) => (
            <div key={scene.index} className="bg-white rounded border border-gray-200 p-4">
              <div className="font-medium text-gray-900 mb-2">Scene {scene.index}</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Background:</strong> {scene.bg_prompt}</div>
                <div><strong>Headline:</strong> {scene.headline}</div>
                <div><strong>CTA:</strong> {scene.cta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Please review your ad configuration. You can approve it as-is or request edits to specific scenes.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Edit Specific Scene (Optional)</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {scenes.map((scene) => (
              <label key={scene.index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scene"
                  value={scene.index}
                  checked={selectedScene === scene.index}
                  onChange={(e) => setSelectedScene(parseInt(e.target.value))}
                  className="text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Scene {scene.index}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          {onBack && (
            <MinimalButton onClick={onBack}>
              Back
            </MinimalButton>
          )}
          
          <div className="flex space-x-4">
            <MinimalButton 
              onClick={handleEdit}
              disabled={isLoading}
            >
              Request Edit
            </MinimalButton>
            
            <MinimalButton 
              onClick={onApprove} 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Approve Ad'}
            </MinimalButton>
          </div>
        </div>
      </div>
    </div>
  )
} 