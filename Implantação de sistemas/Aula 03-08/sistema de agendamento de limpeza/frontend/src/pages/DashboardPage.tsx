import { CalendarClock, CheckCircle2, CircleDashed, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { getApiError } from '../hooks/useApiError'
import { dashboardService } from '../services/crud.service'
import type { Dashboard } from '../types'
import { formatDateTime } from '../utils/format'

const cardStyle = ['bg-blue-600', 'bg-amber-500', 'bg-violet-600', 'bg-emerald-600']
export function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null)
  useEffect(() => { dashboardService.get().then(setData).catch((error) => toast.error(getApiError(error))) }, [])
  const cards = data ? [{ label: 'Total de agendamentos', value: data.cards.total, icon: CalendarClock }, { label: 'Pendentes', value: data.cards.pendentes, icon: CircleDashed }, { label: 'Confirmados', value: data.cards.confirmados, icon: CheckCircle2 }, { label: 'Concluídos', value: data.cards.concluidos, icon: CheckCircle2 }] : []
  return <div className="space-y-7"><div><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Visão geral</p><h1 className="mt-1 text-3xl font-bold">Dashboard</h1></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label, value, icon: Icon }, index) => <article key={label} className={`${cardStyle[index]} rounded-2xl p-5 text-white shadow-sm`}><Icon className="mb-6 opacity-80" /><p className="text-sm font-medium opacity-90">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></article>)}</div><section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-2"><TriangleAlert className="text-amber-500" /><h2 className="text-lg font-bold">Alertas: próximas 24 horas</h2></div><div className="mt-4 divide-y divide-slate-100">{data?.alertas.length ? data.alertas.map((alert) => <div key={alert.id} className="flex flex-col justify-between gap-1 py-4 sm:flex-row"><p className="font-medium text-slate-700">{alert.mensagem}</p><time className="text-sm text-slate-500">{formatDateTime(alert.dataHoraInicio)}</time></div>) : <p className="py-8 text-center text-slate-500">Nenhum alerta para as próximas 24 horas.</p>}</div></section></div>
}
