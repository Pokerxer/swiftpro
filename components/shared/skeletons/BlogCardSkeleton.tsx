export default function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="aspect-[3/2] bg-gray-200 dark:bg-slate-700" />
        <div className="p-5">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
          <div className="h-5 w-full bg-gray-200 dark:bg-slate-700 rounded mb-3" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
          <div className="flex items-center justify-between">
            <div className="h-3 w-12 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}