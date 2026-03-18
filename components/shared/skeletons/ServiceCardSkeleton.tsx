export default function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-full p-6 md:p-8 rounded-2xl bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800">
        <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-slate-700 mb-5" />
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
        <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
}