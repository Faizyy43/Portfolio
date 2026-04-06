export function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center space-y-4">
      <p className="text-red-400">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
}