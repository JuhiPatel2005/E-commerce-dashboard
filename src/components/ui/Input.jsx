export function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label ? <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</div> : null}
      <input
        className={`h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 ${className}`}
        {...props}
      />
      {error ? <div className="mt-1 text-sm text-rose-600">{error}</div> : null}
    </label>
  )
}

