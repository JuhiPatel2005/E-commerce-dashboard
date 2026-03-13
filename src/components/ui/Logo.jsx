export function Logo() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
        <span className="text-sm font-semibold">EC</span>
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">E-Commerce</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Dashboard</div>
      </div>
    </div>
  )
}

