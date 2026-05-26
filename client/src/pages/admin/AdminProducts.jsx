import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../../services/api';
import { normalizeProducts } from '../../utils/normalizeProducts';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [imageSource, setImageSource] = useState('url'); // 'url' or 'device'
  
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: 'beard',
    price: '',
    comparePrice: '',
    stock: '',
    descriptionText: '',
    productDetailsText: '',
    imageUrlsText: '',
    isBundle: false,
    bundleProductsText: '',
    usageGuide: '',
    ratings: '4.5',
    numReviews: '0',
    isFeatured: false,
    isTrending: false,
  });

  const load = () =>
    getProducts({ limit: 100 })
      .then((r) => {
        const list = normalizeProducts(r.data);
        setProducts(list);
      })
      .catch(() => setProducts([]));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you absolutely sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      load();
    } catch {
      alert('Failed to delete product. Check API permissions.');
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      name: val,
      // Auto generate slug in real time
      slug: val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the base64 data URL as the image source text
      setForm((prev) => ({
        ...prev,
        imageUrlsText: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (p) => {
    setEditingProduct(p);
    
    // Automatically detect image source type based on prefix
    const firstImg = p.images?.[0] || p.image || '';
    const isBase64 = firstImg.startsWith('data:image');
    setImageSource(isBase64 ? 'device' : 'url');

    setForm({
      name: p.name || '',
      slug: p.slug || '',
      category: p.category || 'beard',
      price: p.price || '',
      comparePrice: p.comparePrice || '',
      stock: p.stock || '',
      descriptionText: Array.isArray(p.description) ? p.description.join('\n') : p.description || '',
      productDetailsText: Array.isArray(p.productDetails) ? p.productDetails.join('\n') : p.productDetails || '',
      imageUrlsText: Array.isArray(p.images) ? p.images.join(', ') : p.images || '',
      isBundle: p.isBundle || false,
      bundleProductsText: Array.isArray(p.products) ? p.products.join(', ') : p.products || '',
      usageGuide: p.usageGuide || '',
      ratings: p.ratings || '4.5',
      numReviews: p.numReviews || '0',
      isFeatured: p.isFeatured || false,
      isTrending: p.isTrending || false,
    });
    setShowAddForm(true); // Open form
  };

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      category: 'beard',
      price: '',
      comparePrice: '',
      stock: '',
      descriptionText: '',
      productDetailsText: '',
      imageUrlsText: '',
      isBundle: false,
      bundleProductsText: '',
      usageGuide: '',
      ratings: '4.5',
      numReviews: '0',
      isFeatured: false,
      isTrending: false,
    });
    setEditingProduct(null);
    setImageSource('url');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map description text lines into a clean array
    const description = form.descriptionText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    // Map product details text lines into a clean array (only if it's not a bundle)
    const productDetails = form.isBundle
      ? []
      : form.productDetailsText
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);

    // Map comma-separated image URLs into an array
    const images = form.imageUrlsText
      .split(',')
      .map((img) => img.trim())
      .filter(Boolean);

    // Map bundle products slugs into an array
    const productsList = form.isBundle
      ? form.bundleProductsText
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.isBundle ? 'bundles' : form.category,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : 0,
      stock: Number(form.stock),
      description,
      productDetails,
      images: images.length ? images : ['https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=800&q=80&auto=format&fit=crop'],
      isBundle: form.isBundle,
      products: productsList,
      usageGuide: form.isBundle ? '' : form.usageGuide,
      ratings: Number(form.ratings) || 4.5,
      numReviews: Number(form.numReviews) || 0,
      isFeatured: form.isFeatured,
      isTrending: form.isTrending,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
        alert('Product formulation updated successfully!');
      } else {
        await createProduct(payload);
        alert('Product formulation published successfully!');
      }
      resetForm();
      setShowAddForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  // Perform dynamic filtering based on category selection
  const filteredProducts = products.filter((p) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'bundles') return p.isBundle;
    return p.category === filterCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-wide text-gradient-gold" style={{ fontFamily: 'Orbitron' }}>
          Product Registry
        </h1>
        <button
          onClick={() => {
            if (showAddForm) resetForm();
            setShowAddForm(!showAddForm);
          }}
          className="btn-primary text-xs py-2 px-5 cursor-pointer"
        >
          {showAddForm && !editingProduct ? 'Cancel' : editingProduct ? 'Reset / Cancel' : 'Add Product'}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="glass p-6 md:p-8 rounded-3xl border border-[#D4AF37]/20 shadow-xl max-w-4xl mx-auto space-y-6"
          >
            <h2 className="text-lg font-bold text-[#D4AF37] uppercase tracking-wider" style={{ fontFamily: 'Orbitron' }}>
              {editingProduct ? `Edit Formulation: ${editingProduct.name}` : 'Register New Formulation'}
            </h2>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Formulation Name</label>
                <input
                  required
                  placeholder="e.g. Royal Beard Elixir"
                  className="input-field"
                  value={form.name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Custom URL Slug</label>
                <input
                  required
                  placeholder="e.g. royal-beard-elixir"
                  className="input-field font-mono"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            </div>

            {/* Type & Category Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Product Type</label>
                <select
                  className="input-field"
                  value={form.isBundle ? 'bundle' : 'standard'}
                  onChange={(e) => setForm({ ...form, isBundle: e.target.value === 'bundle' })}
                >
                  <option value="standard">Standard Formulation</option>
                  <option value="bundle">Curated Combo / Bundle</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Category Area</label>
                <select
                  disabled={form.isBundle}
                  className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                  value={form.isBundle ? 'bundles' : form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="beard">Beard Grooming</option>
                  <option value="face">Face Nourishment</option>
                  <option value="hair">Hair Styling</option>
                  <option value="perfume">Fine Fragrances</option>
                </select>
              </div>
            </div>

            {/* Numbers: Price, Compare, Stock, Ratings, numReviews */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Price (₹)</label>
                <input
                  required
                  type="number"
                  placeholder="499"
                  className="input-field font-mono"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Compare (₹)</label>
                <input
                  type="number"
                  placeholder="799"
                  className="input-field font-mono"
                  value={form.comparePrice}
                  onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Stock Qty</label>
                <input
                  required
                  type="number"
                  placeholder="100"
                  className="input-field font-mono"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Aura Ratings</label>
                <input
                  required
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  placeholder="4.5"
                  className="input-field font-mono"
                  value={form.ratings}
                  onChange={(e) => setForm({ ...form, ratings: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Reviews Count</label>
                <input
                  required
                  type="number"
                  placeholder="0"
                  className="input-field font-mono"
                  value={form.numReviews}
                  onChange={(e) => setForm({ ...form, numReviews: e.target.value })}
                />
              </div>
            </div>

            {/* Conditional Bundle items input */}
            <AnimatePresence>
              {form.isBundle && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1 overflow-hidden"
                >
                  <label className="text-xs text-gray-400 font-semibold uppercase">Bundle Products Slugs (Comma separated)</label>
                  <input
                    required={form.isBundle}
                    placeholder="e.g. desii-gabru-face-wash, desii-gabru-beard-shiner"
                    className="input-field font-mono text-xs"
                    value={form.bundleProductsText}
                    onChange={(e) => setForm({ ...form, bundleProductsText: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Images: Web URL vs Local Device selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400 font-semibold uppercase">Formulation Images Selection</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageSource('url');
                      setForm((prev) => ({ ...prev, imageUrlsText: '' }));
                    }}
                    className={`text-[9px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      imageSource === 'url' ? 'bg-[#D4AF37] text-[#050505]' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Enter URLs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageSource('device');
                      setForm((prev) => ({ ...prev, imageUrlsText: '' }));
                    }}
                    className={`text-[9px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      imageSource === 'device' ? 'bg-[#D4AF37] text-[#050505]' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Select From Device
                  </button>
                </div>
              </div>

              {imageSource === 'url' ? (
                <input
                  placeholder="e.g. https://images.unsplash.com/img1, https://images.unsplash.com/img2"
                  className="input-field text-xs font-mono"
                  value={form.imageUrlsText}
                  onChange={(e) => setForm({ ...form, imageUrlsText: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-4 p-3 glass rounded-xl border border-white/10">
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs text-gray-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-[#050505] file:cursor-pointer cursor-pointer"
                    onChange={handleFileChange}
                  />
                  {form.imageUrlsText && form.imageUrlsText.startsWith('data:image') && (
                    <div className="relative">
                      <img
                        src={form.imageUrlsText}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-lg border border-[#D4AF37]/40 shadow"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Directions to use (Conditionally hidden for Bundles) */}
            {!form.isBundle && (
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Direction to Use / Usage Instructions</label>
                <input
                  placeholder="e.g. Massage onto wet face in gentle circles, rinse with lukewarm water."
                  className="input-field"
                  value={form.usageGuide}
                  onChange={(e) => setForm({ ...form, usageGuide: e.target.value })}
                />
              </div>
            )}

            {/* Bullets textareas (Key Ingredients conditionally hidden for Bundles) */}
            <div className={`grid gap-6 ${form.isBundle ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold uppercase">Description Bullets (One per line)</label>
                <textarea
                  rows={4}
                  placeholder="Ultra-Deep Cleansing: Penetrates deep into pores...&#10;Tribe Aura Fragrance: Infused with signature wood scents..."
                  className="input-field resize-none text-xs"
                  value={form.descriptionText}
                  onChange={(e) => setForm({ ...form, descriptionText: e.target.value })}
                />
              </div>

              {!form.isBundle && (
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Key Ingredients & Details (One per line)</label>
                  <textarea
                    rows={4}
                    placeholder="Key Ingredients: Charcoal extract, Aloe Vera, Vitamin E&#10;Suitable For: All skin types&#10;Sulphate & Paraben Free: 100% organic"
                    className="input-field resize-none text-xs"
                    value={form.productDetailsText}
                    onChange={(e) => setForm({ ...form, productDetailsText: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Trending & Featured highlights */}
            <div className="flex gap-8 py-2 border-t border-white/5 pt-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded border-[#D4AF37]/20 text-[#D4AF37] focus:ring-[#D4AF37]/30 bg-transparent"
                />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Featured Elite</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                  className="w-4 h-4 rounded border-[#D4AF37]/20 text-[#D4AF37] focus:ring-[#D4AF37]/30 bg-transparent"
                />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Trending Pack</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary w-full text-xs py-2.5">
                {editingProduct ? 'Commit Updates' : 'Publish Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline w-full text-xs py-2.5"
                >
                  Discard Changes
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* FILTER CONTROL PANEL */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Categorized Filter:</span>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'beard', label: 'Beard' },
              { id: 'face', label: 'Face' },
              { id: 'hair', label: 'Hair' },
              { id: 'perfume', label: 'Scents' },
              { id: 'bundles', label: 'Combos' },
            ].map((tabBtn) => (
              <button
                key={tabBtn.id}
                onClick={() => setFilterCategory(tabBtn.id)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                  filterCategory === tabBtn.id
                    ? 'bg-[#D4AF37] text-[#050505] border-[#D4AF37]'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tabBtn.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Registry items: <span className="text-white font-mono">{filteredProducts.length}</span> / {products.length}
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D4AF37]/20 text-left text-gray-400 bg-white/5">
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Image</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Name</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Type / Area</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Price</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Stock</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Rating / Reviews</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs">Aura Status</th>
                <th className="p-4 font-bold uppercase tracking-wider text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No formulations loaded for the selected filter area.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="p-4">
                      <img
                        src={p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=80&q=80'}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg border border-white/10"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=80&q=80';
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-white leading-tight">{p.name}</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">{p.slug}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 w-max">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider text-center ${
                          p.isBundle ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {p.isBundle ? 'Combo' : 'Standard'}
                        </span>
                        {!p.isBundle && (
                          <span className="text-[9px] font-bold text-gray-400 text-center capitalize">{p.category}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-mono font-bold text-[#D4AF37]">₹{p.price}</p>
                      {p.comparePrice > 0 && (
                        <p className="font-mono text-[10px] text-gray-500 line-through">₹{p.comparePrice}</p>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-gray-300">
                      {p.stock} <span className="text-[10px] text-gray-500">pcs</span>
                    </td>
                    <td className="p-4 font-semibold">
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        <span>★</span>
                        <span className="text-white text-xs">{p.ratings || '4.5'}</span>
                        <span className="text-gray-500 text-[10px] font-normal">({p.numReviews || 0})</span>
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      {p.isFeatured && (
                        <span className="block text-[8px] font-black bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-[#050505] px-2 py-0.5 rounded-md uppercase tracking-wider w-max">
                          Featured
                        </span>
                      )}
                      {p.isTrending && (
                        <span className="block text-[8px] font-black bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md uppercase tracking-wider w-max">
                          Trending
                        </span>
                      )}
                      {!p.isFeatured && !p.isTrending && (
                        <span className="text-xs text-gray-600 font-medium">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-3 justify-center items-center">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-[#D4AF37] hover:text-white transition-colors text-xs font-bold bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/20 px-3 py-1.2 rounded-lg cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-400 hover:text-white transition-colors text-xs font-bold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-1.2 rounded-lg cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
