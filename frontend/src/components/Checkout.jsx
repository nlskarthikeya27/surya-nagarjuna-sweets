import { useState } from "react";

export default function Checkout({ items, total, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields!");
      return;
    }

    const orderData = {
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
      totalAmount: total,
      paymentMethod: "Cash on Delivery",
    };

    try {
      setLoading(true);
      const res = await fetch("https://surya-nagarjuna-sweets.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (res.ok) {
        setOrdered(true);
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (err) {
      alert("Cannot connect to server! Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Order Placed!</h2>
          <p className="text-amber-600 mb-1">Thank you, <strong>{form.name}</strong>!</p>
          <p className="text-amber-600 mb-4">We'll deliver to your address soon.</p>
          <div className="bg-amber-50 rounded-xl p-4 text-left mb-4">
            <p className="text-sm text-amber-700 font-semibold mb-2">Order Summary:</p>
            {items.map((i) => (
              <p key={i._id} className="text-sm text-amber-800">
                {i.name} x{i.qty} — ₹{i.price * i.qty}
              </p>
            ))}
            <p className="font-bold text-amber-900 mt-2 border-t border-amber-200 pt-2">
              Total: ₹{total}
            </p>
          </div>
          <p className="text-green-600 font-semibold mb-4">💵 Cash on Delivery</p>
          <button
            onClick={onClose}
            className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <h2 className="text-xl font-bold text-amber-800 mb-4">📦 Checkout</h2>

        <div className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-600"
          />
          <textarea
            placeholder="Delivery Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={3}
            className="w-full border border-amber-300 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-600 resize-none"
          />
        </div>

        <div className="bg-amber-50 rounded-xl p-3 mb-4">
          <div className="flex justify-between font-bold text-amber-900">
            <span>Total Amount:</span>
            <span>₹{total}</span>
          </div>
          <p className="text-amber-600 text-sm mt-1">💵 Payment: Cash on Delivery</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-amber-300 text-amber-700 py-3 rounded-xl font-semibold hover:bg-amber-50"
          >
            ← Back
          </button>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="flex-1 bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 disabled:opacity-50"
          >
            {loading ? "Placing..." : "Place Order 🎉"}
          </button>
        </div>
      </div>
    </div>
  );
}