import { useState } from "react";
import ProductCard from "./ProductCard";

import kajuKatli from "../assets/kaju-katli.png";
import rasgulla from "../assets/rasgulla.png";
import besanLadoo from "../assets/besan-ladoo.png";
import milkBurfi from "../assets/milk-burfi.png";
import jalebi from "../assets/jalebi.png";
import julabjamun from "../assets/julabjamun.png";
import hotSpicyNoodles from "../assets/hot-spicy-noodles.png";
import hotSpicyCurry from "../assets/hot-spicy-curry.png";
import hotCrispy from "../assets/hot-crispy.png";
import pureGhee from "../assets/pure-ghee.png";

const ALL_PRODUCTS = [
  { _id: "1", name: "Kaju Katli", price: 50, category: "sweet", isSugarFree: false, image: kajuKatli, description: "Rich cashew delight" },
  { _id: "2", name: "Rasgulla", price: 20, category: "sweet", isSugarFree: false, image: rasgulla, description: "Soft & spongy classic" },
  { _id: "3", name: "Besan Ladoo", price: 25, category: "sweet", isSugarFree: false, image: besanLadoo, description: "Pure & traditional" },
  { _id: "4", name: "Milk Burfi", price: 30, category: "sweet", isSugarFree: false, image: milkBurfi, description: "Creamy milk delight" },
  { _id: "5", name: "Jalebi", price: 15, category: "sweet", isSugarFree: false, image: jalebi, description: "Crispy & syrupy" },
  { _id: "6", name: "Gulab Jamun", price: 20, category: "sweet", isSugarFree: false, image: julabjamun, description: "Soft & juicy" },
  { _id: "7", name: "Hot Spicy Noodles", price: 40, category: "hot", isSugarFree: false, image: hotSpicyNoodles, description: "Spicy twist of taste" },
  { _id: "8", name: "Hot Spicy Curry", price: 45, category: "hot", isSugarFree: false, image: hotSpicyCurry, description: "Warms you up!" },
  { _id: "9", name: "Hot Crispy Snack", price: 35, category: "hot", isSugarFree: false, image: hotCrispy, description: "Crispy outside, spicy inside" },
  { _id: "10", name: "SNS Pure Ghee", price: 199, category: "ghee", isSugarFree: false, image: pureGhee, description: "100% pure desi ghee" },
];

export default function ProductGrid({ addToCart }) {
  const [category, setCategory] = useState("all");
  const [sugarFree, setSugarFree] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (sugarFree && !p.isSugarFree) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-amber-700 text-white rounded-2xl p-8 mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to Surya Nagarjuna Sweets 🎉</h2>
        <p className="text-amber-200">Fresh sweets, hot snacks & pure ghee — delivered to your door!</p>
        <p className="text-amber-300 text-sm mt-1">📍 Bāpatla | 🚚 Cash on Delivery</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 mb-8 shadow flex flex-wrap gap-4 items-center">
        <div className="flex gap-2 flex-wrap">
          {["all", "sweet", "hot", "ghee"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold capitalize transition ${
                category === cat
                  ? "bg-amber-700 text-white"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              {cat === "all" ? "🍽 All" : cat === "sweet" ? "🍬 Sweet" : cat === "hot" ? "🌶 Hot" : "🫙 Ghee"}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-amber-800 font-medium cursor-pointer ml-auto">
          <input
            type="checkbox"
            checked={sugarFree}
            onChange={(e) => setSugarFree(e.target.checked)}
            className="w-4 h-4 accent-amber-700"
          />
          Sugar Free Only
        </label>

        <div className="w-full flex items-center gap-4">
          <span className="text-amber-800 font-medium text-sm whitespace-nowrap">💰 Max Price: ₹{maxPrice}</span>
          <input
            type="range"
            min={10}
            max={200}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-amber-700"
          />
          <span className="text-amber-600 text-sm">₹200</span>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-amber-600 text-xl py-16">
          😕 No products match your filters!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}