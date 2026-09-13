const CartToast = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white shadow-xl">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm font-bold">
        ✓
      </div>

      <div>
        <p className="text-sm font-semibold">Added to Cart</p>
        <p className="text-xs text-gray-400">Product added successfully</p>
      </div>
    </div>
  );
};

export default CartToast;
