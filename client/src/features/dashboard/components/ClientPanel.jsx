import { useEffect, useState } from "react";
import api from "../../../api/api";

export default function ClientPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  return (
    <div
      className="min-h-screen 
bg-black text-white 
dark:bg-black dark:text-white 
light:bg-white light:text-black p-6"
    >
      <h1 className="text-2xl mb-6">My Projects</h1>

      {orders.map((o) => (
        <div key={o._id} className="bg-gray-800 p-4 rounded mb-4">
          <h2>{o.title}</h2>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
