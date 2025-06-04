import MinimalButton from './MinimalButton'

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

interface PreviewPaneProps {
  preview: Preview | null
  scenes: Scene[]
  onContinue: () => void
  onBack?: () => void
}

export default function PreviewPane({ preview, scenes, onContinue, onBack }: PreviewPaneProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-light mb-8 text-gray-900">Preview Your Ad</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {preview && (
            <img
              src={preview.preview_url}
              alt="Ad Preview"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          )}
        </div>
        
        <div className="space-y-6">
          {preview && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Summary</h3>
              <p className="text-gray-600 leading-relaxed">{preview.summary}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Scene Details</h3>
            <div className="space-y-4">
              {scenes.map((scene) => (
                <div key={scene.index} className="border border-gray-200 rounded-lg p-4">
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
        </div>
      </div>

      <div className="flex justify-between pt-8">
        {onBack && (
          <MinimalButton onClick={onBack}>
            Back
          </MinimalButton>
        )}
        <MinimalButton onClick={onContinue} variant="primary">
          Continue to Confirm
        </MinimalButton>
      </div>
    </div>
  )
} 