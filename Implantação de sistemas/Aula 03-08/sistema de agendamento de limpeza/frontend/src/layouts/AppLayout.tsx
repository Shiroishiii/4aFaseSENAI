import { CalendarDays, ClipboardList, LayoutDashboard, LogOut, Menu, Users, Wrench } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const links = [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }, { to: '/clientes', label: 'Clientes', icon: Users }, { to: '/profissionais', label: 'Profissionais', icon: Wrench }, { to: '/agendamentos', label: 'Agendamentos', icon: CalendarDays }, { to: '/gestao-agendamentos', label: 'Gestão de agenda', icon: ClipboardList }]
export function AppLayout({ children }: { children?: ReactNode }) {
  const { user, logout } = useAuth(); const [open, setOpen] = useState(false)
  return <div className="min-h-screen bg-slate-100"><aside className={`fixed inset-y-0 z-30 w-64 bg-blue-950 p-5 text-slate-100 transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}><div className="mb-9 flex items-center gap-3 text-xl font-bold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500">FF</span>Faxina Fácil</div><nav className="space-y-1">{links.map(({ to, label, icon: Icon }) => <NavLink end={to === '/'} key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-900'}`}><Icon size={19} />{label}</NavLink>)}</nav></aside><main className="md:pl-64"><header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8"><button className="rounded-lg p-2 hover:bg-slate-100 md:hidden" onClick={() => setOpen(true)}><Menu /></button><div className="ml-auto flex items-center gap-4"><div className="text-right"><p className="text-sm font-semibold">{user?.nome}</p><p className="text-xs text-slate-500">{user?.papel}</p></div><button onClick={logout} title="Sair" className="rounded-xl p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><LogOut size={20} /></button></div></header><div className="p-5 md:p-8">{children ?? <Outlet />}</div></main></div>
}
