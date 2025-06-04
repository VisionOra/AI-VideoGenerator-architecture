interface MinimalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function MinimalButton({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'secondary',
  disabled = false 
}: MinimalButtonProps) {
  const baseClasses = 'px-4 py-2 rounded border transition-colors font-medium'
  const variants = {
    primary: 'bg-accent text-white border-accent hover:bg-blue-700 hover:border-blue-700',
    secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
} 