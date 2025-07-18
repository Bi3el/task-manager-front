import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TasksDataContextProvider } from './contexts/tasks-context.tsx'
import { Toaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors position='top-right'/>
      <QueryClientProvider client={queryClient}>
        <TasksDataContextProvider>
           <App />
        </TasksDataContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
