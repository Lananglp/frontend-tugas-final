import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MyRoute from './routes/MyRoute'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <MyRoute/>
    </RecoilRoot>
  </React.StrictMode>,
)
