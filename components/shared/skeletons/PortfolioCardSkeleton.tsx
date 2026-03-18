export default function PortfolioCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-full rounded-2xl overflow-hidden bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800">
        <div className="aspect-[4/3] bg-gray-200 dark:bg-slate-700" />
        <div className="p-5">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
          <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
          <div className="flex gap-2">
            <div className="h-6 w-14 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-6 w-14 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}