import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ArticleIcon from '@mui/icons-material/Article'

const links = [
  { to: '/', label: 'All Posts' },
  { to: '/add', label: 'Add New' },
  { to: '/preview', label: 'Preview' },
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 text-primary-500 font-bold text-lg">
            <ArticleIcon fontSize="small" />
            Article Management System
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-500 border-b-2 border-primary-500 pb-0.5'
                      : 'text-gray-600 hover:text-primary-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-primary-500"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium py-1 ${
                  isActive ? 'text-primary-500' : 'text-gray-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
