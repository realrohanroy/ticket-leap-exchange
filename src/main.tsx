
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Using React 18's createRoot API
createRoot(document.getElementById("root")!).render(<App />);
