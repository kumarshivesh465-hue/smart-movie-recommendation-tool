export default function SearchHistory({ history, onSelect, onClear }) {
  if (!history || history.length === 0) return null;

  const icon = (mode) => (mode === 'mood' ? '💭' : mode === 'actor' ? '🎭' : '🎬');

  return (
    <div className="max-w-2xl mx-auto mt-4 flex flex-wrap items-center gap-2 justify-center">
      <span className="text-xs text-neutral-500 dark:text-neutral-500">Recent:</span>
      {history.map((h, i) => (
        <button
          key={i}
          onClick={() => onSelect(h)}
          className="px-3 py-1 text-xs rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:opacity-80 transition-opacity"
        >
          {icon(h.mode)} {h.query}
        </button>
      ))}
      <button
        onClick={onClear}
        className="text-xs text-neutral-400 dark:text-neutral-600 hover:text-red-400 ml-1"
      >
        ✕ clear
      </button>
    </div>
  );
}