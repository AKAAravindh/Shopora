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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <FiAlertTriangle size={21} className="text-red-500" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {itemToRemove.title || "Are you sure?"}
        </h2>

        <p className="mt-2 text-sm leading-5 text-gray-500">
          {itemToRemove.message || "This action cannot be undone."}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
          >
            {itemToRemove.cancelText || "Cancel"}
          </button>

          <button
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 cursor-pointer"
          >
            {itemToRemove.confirmText || "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
