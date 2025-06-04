import { useState, useEffect } from 'react'
import { useAdBuilder } from '../hooks/useAdBuilder'
import MetaForm from './MetaForm'
import SceneForm from './SceneForm'
import PreviewPane from './PreviewPane'
import ConfirmPane from './ConfirmPane'
import MinimalButton from './MinimalButton'

type WizardStep = 'start' | 'meta' | 'scenes' | 'preview' | 'confirm' | 'complete'

export default function WizardContainer() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('start')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [finalResult, setFinalResult] = useState<any>(null)

  const {
    session,
    meta,
    scenes,
    preview,
    start,
    submitMeta,
    submitScenes,
    getPreview,
    confirm
  } = useAdBuilder()

  const handleStart = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await start()
      setCurrentStep('meta')
    } catch (err) {
      setError('Failed to start session')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMetaSubmit = async (metaData: any) => {
    try {
      setIsLoading(true)
      setError(null)
      await submitMeta(metaData)
      setCurrentStep('scenes')
    } catch (err) {
      setError('Failed to submit meta data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleScenesSubmit = async (sceneData: any) => {
    try {
      setIsLoading(true)
      setError(null)
      await submitScenes({ scenes: sceneData })
      await getPreview()
      setCurrentStep('preview')
    } catch (err) {
      setError('Failed to submit scenes')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviewContinue = () => {
    setCurrentStep('confirm')
  }

  const handleApprove = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await confirm('approve')
      setFinalResult(result)
      setCurrentStep('complete')
    } catch (err) {
      setError('Failed to approve ad')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (sceneIndex?: number) => {
    try {
      setIsLoading(true)
      setError(null)
      await confirm('edit', sceneIndex ? { scene: sceneIndex } : {})
      setCurrentStep('scenes')
    } catch (err) {
      setError('Failed to request edit')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = (step: WizardStep) => {
    setCurrentStep(step)
    setError(null)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'start':
        return (
          <div className="max-w-md mx-auto p-8 text-center">
            <h1 className="text-3xl font-light mb-8 text-gray-900">Ad Builder</h1>
            <p className="text-gray-600 mb-8">
              Create engaging ads with our step-by-step wizard. Configure your scenes, 
              preview your ad, and get it approved in minutes.
            </p>
            <MinimalButton 
              onClick={handleStart} 
              variant="primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Starting...' : 'Start Building'}
            </MinimalButton>
          </div>
        )

      case 'meta':
        return (
          <MetaForm 
            onSubmit={handleMetaSubmit}
            onBack={() => handleBack('start')}
          />
        )

      case 'scenes':
        return (
          <SceneForm 
            initialScenes={scenes}
            onSubmit={handleScenesSubmit}
            onBack={() => handleBack('meta')}
          />
        )

      case 'preview':
        return (
          <PreviewPane 
            preview={preview}
            scenes={scenes}
            onContinue={handlePreviewContinue}
            onBack={() => handleBack('scenes')}
          />
        )

      case 'confirm':
        return (
          <ConfirmPane 
            scenes={scenes}
            onApprove={handleApprove}
            onEdit={handleEdit}
            onBack={() => handleBack('preview')}
            isLoading={isLoading}
          />
        )

      case 'complete':
        return (
          <div className="max-w-md mx-auto p-8 text-center">
            <h2 className="text-2xl font-light mb-6 text-gray-900">Ad Approved!</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                Your ad has been successfully approved and is ready for use.
              </p>
            </div>
            {finalResult && (
              <div className="text-left text-sm text-gray-600 bg-gray-50 rounded p-4 mb-6">
                <pre>{JSON.stringify(finalResult, null, 2)}</pre>
              </div>
            )}
            <MinimalButton 
              onClick={() => window.location.reload()} 
              variant="primary"
            >
              Create Another Ad
            </MinimalButton>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {renderCurrentStep()}
    </div>
  )
} 