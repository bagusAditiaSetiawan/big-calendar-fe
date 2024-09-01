import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { rootRouter } from './routes/root'
import {RouterProvider} from "react-router";
import './index.css'
import './index.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={rootRouter} />
  </StrictMode>
)
