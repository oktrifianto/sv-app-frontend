import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddNew from '../pages/AddNew'
import EditArticle from '../pages/EditArticle'
import Preview from '../pages/Preview'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddNew />} />
      <Route path="/edit/:id" element={<EditArticle />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}
