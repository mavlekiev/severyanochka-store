export default function LoadMoreButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex justify-center p-">
      <button
        onClick={onClick}
        disabled={loading}
        className="border border-solid border-gray-200 rounded p-2 px-6 font-medium text-base leading-normal transition-all duration-300 ease-in-out hover:border-orange-100 disabled:border-gray-200 disabled:text-gray-200"
      >
        Загрузить еще
      </button>
    </div>
  );
}
