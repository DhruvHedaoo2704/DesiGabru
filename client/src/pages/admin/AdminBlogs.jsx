export default function AdminBlogs() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Orbitron' }}>Blog Management</h1>
      <p className="text-gray-400">Use POST /api/blogs with admin token to create articles. Seed data includes sample blogs.</p>
    </div>
  );
}
