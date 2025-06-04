import { createBrowserRouter } from 'react-router-dom'
import WizardContainer from './components/WizardContainer'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WizardContainer />
  }
]) 