import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Paginated } from '../types'

export function Pagination<T>({ result, onChange }: { result: Paginated<T>; onChange: (page: number) => void }) {
  return <footer className="flex items-center justify-between gap-3 border-t border-slate-100 px-1 pt-4 text-sm text-slate-500"><span>{result.meta.total} registro(s)</span><div className="flex items-center gap-2"><button disabled={result.meta.page <= 1} onClick={() => onChange(result.meta.page - 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronLeft size={16} /></button><span>Página {result.meta.page} de {Math.max(result.meta.totalPages, 1)}</span><button disabled={result.meta.page >= result.meta.totalPages} onClick={() => onChange(result.meta.page + 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronRight size={16} /></button></div></footer>
}
