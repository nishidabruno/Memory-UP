import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/react-query'

import { router } from './router'

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="memoryup-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors closeButton position="bottom-left" duration={1400} />
    </ThemeProvider>
  )
}
