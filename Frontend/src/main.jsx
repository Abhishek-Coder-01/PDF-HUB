import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
    <BrowserRouter>
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>

   </BrowserRouter>
)
