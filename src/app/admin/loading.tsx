export default function AdminLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 bg-black/5 min-h-[50vh] rounded-xl dark:bg-white/5">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
