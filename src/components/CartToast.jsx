import { FiCheck } from "react-icons/fi";

const CartToast = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50 flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-950 px-5 py-3.5 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
        <FiCheck size={15} strokeWidth={3} />
      </div>

      <div>
        <p className="text-sm font-semibold">Added to Cart</p>
        <p className="text-xs text-gray-400">Product added successfully</p>
      </div>
    </div>
  );
};

export default CartToast;
