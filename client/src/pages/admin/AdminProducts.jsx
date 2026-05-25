import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/api';
import { dummyProducts } from '../../utils/dummyData';
import { normalizeProducts } from '../../utils/normalizeProducts';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const load = () =>
    getProducts({ limit: 50 })
      .then((r) => {
        const list = normalizeProducts(r.data);
        setProducts(list);
      })
      .catch(() => setProducts([]));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      load();
    } catch {
      alert('Connect API to delete');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>Products</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D4AF37]/20 text-left text-gray-400">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-white/5">
                <td className="p-4">{p.name}</td>
                <td className="p-4 capitalize">{p.category}</td>
                <td className="p-4 text-[#D4AF37]">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
