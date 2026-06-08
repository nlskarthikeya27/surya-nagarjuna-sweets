import { useState, useEffect } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const ADMIN_PASSWORD = "surya123";

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://surya-nagarjuna-sweets.onrender.com/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert("Cannot connect to server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchOrders();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg w-80 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-amber-800 mb-6">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-amber-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-amber-600"
          />
          <button
            onClick={() => {
              if (password === ADMIN_PASSWORD) setLoggedIn(true);
              else alert("Wrong password!");
            }}
            className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-amber-800">📋 Orders Dashboard</h1>
          <div className="flex gap-3 items-center">
            <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">
              Total Orders: {orders.length}
            </span>
            <button
              onClick={fetchOrders}
              className="bg-amber-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-800"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-amber-600 text-xl py-16">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-amber-600 text-xl py-16">No orders yet! 😕</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-amber-900 text-lg">
                      #{orders.length - index} — {order.customerName}
                    </h3>
                    <p className="text-amber-600 text-sm">📞 {order.phone}</p>
                    <p className="text-amber-600 text-sm">📍 {order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-800 text-xl">₹{order.totalAmount}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {order.status}
                    </span>
                    <p className="text-amber-400 text-xs mt-1">
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="border-t border-amber-100 pt-3">
                  <p className="text-amber-700 text-sm font-semibold mb-1">Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="bg-amber-50 text-amber-800 text-sm px-3 py-1 rounded-full border border-amber-200">
                        {item.name} x{item.qty} — ₹{item.price * item.qty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-xs text-amber-400">
                  💵 {order.paymentMethod}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}