import { FiAlertTriangle } from "react-icons/fi";
import { useOther } from "../hooks/useOther";

const ConfirmationModal = () => {
  const { itemToRemove, setItemToRemove } = useOther();

  if (!itemToRemove) return null;

  const handleConfirm = () => {
    itemToRemove.onConfirm();
    setItemToRemove(null);
  };

  const handleCancel = () => {
    setItemToRemove(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
          <FiAlertTriangle size={20} strokeWidth={2} className="text-red-500" />
        </div>

        {/* Content */}
        <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-900">
          {itemToRemove.title || "Are you sure?"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {itemToRemove.message || "This action cannot be undone."}
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 cursor-pointer rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {itemToRemove.cancelText || "Cancel"}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 cursor-pointer rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {itemToRemove.confirmText || "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
