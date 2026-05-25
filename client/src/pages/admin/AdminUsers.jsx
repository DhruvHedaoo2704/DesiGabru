import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((r) => setUsers(r.data.users))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>Users</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D4AF37]/20 text-gray-400">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
