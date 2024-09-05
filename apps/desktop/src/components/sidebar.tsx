import { LayoutDashboard, PieChart } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed flex h-screen w-14 flex-col gap-4 bg-secondary/50 px-3 py-5">
      <a className="cursor-pointer" onClick={() => navigate('/')}>
        <LayoutDashboard
          size={30}
          className={`${pathname === '/' ? 'text-zinc-200' : 'text-zinc-500'} transition-colors hover:text-zinc-200`}
        />
      </a>
      <a className="cursor-pointer" onClick={() => navigate('/stats')}>
        <PieChart
          size={30}
          className={`${pathname === '/stats' ? 'text-zinc-200' : 'text-zinc-500'} transition-colors hover:text-zinc-200`}
        />
      </a>
    </div>
  )
}
