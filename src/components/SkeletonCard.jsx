export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent shadow-lg animate-pulse">
      <div className="w-full aspect-[2/3] bg-neutral-200 dark:bg-neutral-800" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
      </div>
    </div>
  );
}