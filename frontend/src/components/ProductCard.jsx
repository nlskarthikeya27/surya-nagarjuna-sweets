export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-amber-900 text-lg leading-tight">{product.name}</h3>
        <p className="text-amber-600 text-sm mt-1 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-amber-700 font-bold text-lg">₹{product.price}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            product.category === "sweet" ? "bg-pink-100 text-pink-700" :
            product.category === "hot" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {product.category === "sweet" ? "🍬 Sweet" : product.category === "hot" ? "🌶 Hot" : "🫙 Ghee"}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-amber-700 text-white py-2 rounded-xl font-semibold hover:bg-amber-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}