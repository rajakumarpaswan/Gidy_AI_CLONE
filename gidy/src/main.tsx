import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider>
   <MantineProvider>
     
    <App />
  

    </MantineProvider>
    </ThemeProvider>
    
  </StrictMode>,
)
