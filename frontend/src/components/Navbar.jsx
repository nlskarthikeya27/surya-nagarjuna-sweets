export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="bg-amber-700 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">🍬 Surya Nagarjuna Sweets</h1>
        <p className="text-amber-200 text-sm">Fresh & Traditional — Bāpatla</p>
      </div>
      <button
        onClick={onCartClick}
        className="relative bg-white text-amber-700 font-bold px-4 py-2 rounded-full hover:bg-amber-100 transition"
      >
        🛒 Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}