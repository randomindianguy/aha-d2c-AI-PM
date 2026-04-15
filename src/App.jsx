import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SkinQuiz from './pages/SkinQuiz'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<SkinQuiz />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
