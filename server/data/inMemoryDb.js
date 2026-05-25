import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { products as initialProducts, categories as initialCategories, blogs as initialBlogs, coupons as initialCoupons } from './products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_DIR = path.join(__dirname, 'store');
const STORE_FILE = path.join(STORE_DIR, 'dbState.json');

// Generate 24-character hexadecimal string mimicking MongoDB ObjectIds
export const generateId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

class InMemoryDb {
  constructor() {
    this.collections = {
      users: [],
      products: [],
      categories: [],
      blogs: [],
      coupons: [],
      orders: [],
      carts: [],
      wishlists: []
    };
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    // Create store directory if it doesn't exist
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }

    // Try to load from disk
    if (fs.existsSync(STORE_FILE)) {
      try {
        const fileData = fs.readFileSync(STORE_FILE, 'utf-8');
        this.collections = JSON.parse(fileData);
        this.initialized = true;
        console.log('✨ Hydrated Desii Gabru In-Memory State from disk');
        return;
      } catch (err) {
        console.error('Failed to parse persistent DB file, seeding fresh', err);
      }
    }

    // Seed data
    await this.seed();
    this.initialized = true;
    this.saveToDisk();
  }

  async seed() {
    console.log('🌱 Seeding fresh Desii Gabru In-Memory Collections...');

    // 1. Seed Users
    const adminId = generateId();
    const demoId = generateId();
    
    const hashedAdminPassword = await bcrypt.hash('admin123', 12);
    const hashedDemoPassword = await bcrypt.hash('demo123', 12);

    this.collections.users = [
      {
        _id: adminId,
        name: 'Admin',
        email: 'admin@desiigabru.com',
        password: hashedAdminPassword,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        phone: '9876543210',
        addresses: [],
        loyaltyPoints: 1000,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: demoId,
        name: 'Demo User',
        email: 'demo@desiigabru.com',
        password: hashedDemoPassword,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
        phone: '9876543211',
        addresses: [
          {
            _id: generateId(),
            label: 'Home',
            fullName: 'Demo User',
            phone: '9876543211',
            street: '404 Cyberspace Ave, Sector 62',
            city: 'Noida',
            state: 'Uttar Pradesh',
            postalCode: '201301',
            country: 'India',
            isDefault: true
          }
        ],
        loyaltyPoints: 250,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // 2. Seed Categories
    this.collections.categories = initialCategories.map(cat => ({
      _id: generateId(),
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // 3. Seed Products
    this.collections.products = initialProducts.map(p => {
      const catObj = this.collections.categories.find(c => c.slug === p.category);
      return {
        _id: generateId(),
        brand: 'Desii Gabru',
        images: p.images || [],
        comparePrice: p.comparePrice || 0,
        sizes: p.sizes || [
          { label: '50ml', price: p.price, stock: Math.floor(p.stock / 2) },
          { label: '100ml', price: Math.round(p.price * 1.6), stock: Math.floor(p.stock / 2) }
        ],
        stock: p.stock || 0,
        ingredients: p.ingredients || [],
        usageGuide: p.usageGuide || '',
        isFeatured: p.isFeatured || false,
        isTrending: p.isTrending || false,
        isBundle: p.isBundle || false,
        bundleSavePercent: p.bundleSavePercent || 0,
        ratings: p.ratings || 4.5,
        numReviews: p.numReviews || 0,
        reviews: [],
        tags: p.tags || [],
        sku: p.sku || `DG-${p.category?.toUpperCase() || 'GEN'}-${Math.floor(100 + Math.random() * 900)}`,
        categoryRef: catObj ? catObj._id : null,
        ...p,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // Populate bundleItems references
    const createdProducts = this.collections.products;
    const kit = createdProducts.find((p) => p.slug === 'cyber-king-grooming-kit');
    const duo = createdProducts.find((p) => p.slug === 'alpha-beard-duo');

    if (kit) {
      kit.bundleItems = createdProducts
        .filter((p) => !p.isBundle)
        .slice(0, 5)
        .map((p) => p._id);
    }
    if (duo) {
      duo.bundleItems = createdProducts
        .filter((p) => ['royal-beard-elixir', 'midnight-beard-balm'].includes(p.slug))
        .map((p) => p._id);
    }

    // 4. Seed Blogs
    this.collections.blogs = initialBlogs.map(b => ({
      _id: generateId(),
      ...b,
      author: adminId,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // 5. Seed Coupons
    this.collections.coupons = initialCoupons.map(c => ({
      _id: generateId(),
      isActive: true,
      usedCount: 0,
      ...c,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    console.log('✅ In-Memory collections successfully seeded.');
  }

  saveToDisk() {
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.collections, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist DB state to disk:', err);
    }
  }
}

export const dbInstance = new InMemoryDb();
// Trigger background initialization
dbInstance.init();

class MockDocument {
  constructor(data, collectionName) {
    Object.assign(this, data);
    Object.defineProperty(this, '_collectionName', { value: collectionName, enumerable: false });
  }

  async save() {
    const coll = dbInstance.collections[this._collectionName];
    if (!coll) return this;

    // Handle password hashing if User model
    if (this._collectionName === 'users' && this.password) {
      const isHashed = this.password.startsWith('$2a$') || this.password.startsWith('$2b$');
      if (!isHashed) {
        this.password = await bcrypt.hash(this.password, 12);
      }
    }

    this.updatedAt = new Date();
    if (!this._id) {
      this._id = generateId();
      this.createdAt = new Date();
      coll.push({ ...this });
    } else {
      const index = coll.findIndex(item => item._id === this._id);
      if (index !== -1) {
        coll[index] = { ...this };
      } else {
        coll.push({ ...this });
      }
    }
    dbInstance.saveToDisk();
    return this;
  }

  async matchPassword(enteredPassword) {
    if (!this.password) return false;
    return bcrypt.compare(enteredPassword, this.password);
  }

  populate(path, select) {
    // Basic dynamic document level populate
    if (path === 'bundleItems' && Array.isArray(this.bundleItems)) {
      this.bundleItems = this.bundleItems.map(itemId => {
        const item = dbInstance.collections.products.find(p => p._id === itemId || p._id === itemId._id);
        if (item) {
          if (select) {
            const fields = select.split(' ');
            const filteredItem = {};
            fields.forEach(f => {
              if (f === 'name' || f === 'images' || f === 'price') {
                filteredItem[f] = item[f];
              }
            });
            filteredItem._id = item._id;
            return filteredItem;
          }
          return item;
        }
        return itemId;
      });
    }
    return this;
  }
}

function wrapDoc(data, collectionName) {
  if (!data) return null;
  return new MockDocument(data, collectionName);
}

function matchCondition(doc, conditions) {
  if (!conditions) return true;
  for (const [key, val] of Object.entries(conditions)) {
    if (key === '$or') {
      if (!Array.isArray(val) || val.length === 0) continue;
      const matchAny = val.some((subCond) => matchCondition(doc, subCond));
      if (!matchAny) return false;
      continue;
    }
    if (key === '$and') {
      if (!Array.isArray(val)) continue;
      const matchAll = val.every((subCond) => matchCondition(doc, subCond));
      if (!matchAll) return false;
      continue;
    }

    const docVal = doc[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      for (const [op, opVal] of Object.entries(val)) {
        if (op === '$regex') {
          const opt = val.$options || '';
          const regex = new RegExp(opVal, opt);
          if (!regex.test(String(docVal || ''))) return false;
        } else if (op === '$gt') {
          if (!(docVal > opVal)) return false;
        } else if (op === '$gte') {
          if (!(docVal >= opVal)) return false;
        } else if (op === '$lt') {
          if (!(docVal < opVal)) return false;
        } else if (op === '$lte') {
          if (!(docVal <= opVal)) return false;
        } else if (op === '$in') {
          const checkArr = Array.isArray(opVal) ? opVal : [opVal];
          if (!checkArr.some(c => String(c) === String(docVal))) return false;
        } else if (op === '$ne') {
          if (docVal === opVal) return false;
        }
      }
    } else {
      // Direct comparison, normalize IDs to strings
      if (key === '_id' || key === 'user' || key === 'product' || key === 'categoryRef') {
        const id1 = docVal ? docVal.toString() : '';
        const id2 = val ? val.toString() : '';
        if (id1 !== id2) return false;
      } else {
        if (docVal !== val) return false;
      }
    }
  }
  return true;
}

class MockQuery {
  constructor(collectionName, conditions = {}, isFindOne = false) {
    this._collectionName = collectionName;
    this._conditions = conditions;
    this._isFindOne = isFindOne;
    this._sortStr = '';
    this._selectStr = '';
    this._skipAmount = 0;
    this._limitAmount = null;
    this._populatePaths = [];
  }

  find(cond) {
    this._conditions = { ...this._conditions, ...cond };
    return this;
  }

  sort(sortBy) {
    this._sortStr = sortBy || '';
    return this;
  }

  select(fields) {
    this._selectStr = fields || '';
    return this;
  }

  skip(amount) {
    this._skipAmount = Number(amount) || 0;
    return this;
  }

  limit(amount) {
    this._limitAmount = Number(amount) || null;
    return this;
  }

  populate(path, select) {
    this._populatePaths.push({ path, select });
    return this;
  }

  execute() {
    let list = dbInstance.collections[this._collectionName] || [];

    // Filter
    list = list.filter(item => matchCondition(item, this._conditions));

    // Sort
    if (this._sortStr) {
      const parts = this._sortStr.split(' ');
      parts.forEach(part => {
        let field = part;
        let desc = false;
        if (part.startsWith('-')) {
          field = part.slice(1);
          desc = true;
        }
        list.sort((a, b) => {
          const valA = a[field];
          const valB = b[field];
          if (valA === undefined || valB === undefined) return 0;
          if (valA < valB) return desc ? 1 : -1;
          if (valA > valB) return desc ? -1 : 1;
          return 0;
        });
      });
    } else {
      // Default sort by createdAt descending
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    // Skip
    if (this._skipAmount > 0) {
      list = list.slice(this._skipAmount);
    }

    // Limit
    if (this._limitAmount !== null) {
      list = list.slice(0, this._limitAmount);
    }

    // Wrap in MockDocument & Populate relations
    let results = list.map(item => {
      const doc = wrapDoc(item, this._collectionName);

      // Perform populate
      this._populatePaths.forEach(({ path: popPath, select: popSelect }) => {
        if (popPath === 'bundleItems' && Array.isArray(doc.bundleItems)) {
          doc.bundleItems = doc.bundleItems.map(itemId => {
            const relProduct = dbInstance.collections.products.find(p => p._id === itemId || p._id === itemId._id);
            if (relProduct) {
              if (popSelect) {
                const selectFields = popSelect.split(' ');
                const filtered = {};
                selectFields.forEach(f => {
                  if (f === 'name' || f === 'images' || f === 'price') {
                    filtered[f] = relProduct[f];
                  }
                });
                filtered._id = relProduct._id;
                return filtered;
              }
              return wrapDoc(relProduct, 'products');
            }
            return itemId;
          });
        }

        if (popPath === 'user') {
          const relUser = dbInstance.collections.users.find(u => u._id === doc.user);
          if (relUser) {
            if (popSelect) {
              const selectFields = popSelect.split(' ');
              const filtered = {};
              selectFields.forEach(f => {
                filtered[f] = relUser[f];
              });
              filtered._id = relUser._id;
              return filtered;
            }
            return wrapDoc(relUser, 'users');
          }
        }
      });

      // Handle custom projection/select rules (like selecting / deselecting password)
      if (this._selectStr) {
        const fields = this._selectStr.split(' ');
        const includes = fields.filter(f => !f.startsWith('-') && f !== '');
        const excludes = fields.filter(f => f.startsWith('-')).map(f => f.slice(1));
        
        if (includes.length > 0) {
          const projected = { _id: doc._id };
          includes.forEach(f => {
            if (doc[f] !== undefined) projected[f] = doc[f];
          });
          return projected;
        } else if (excludes.length > 0) {
          excludes.forEach(f => {
            delete doc[f];
          });
        }
      }

      return doc;
    });

    if (this._isFindOne) {
      return results[0] || null;
    }

    return results;
  }

  // Chainable Thenable interface so await works directly on query
  then(resolve, reject) {
    try {
      const res = this.execute();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  }
}

export function createInMemoryModel(collectionName) {
  return class MockModel {
    constructor(data) {
      return wrapDoc({ ...data, _id: generateId(), createdAt: new Date(), updatedAt: new Date() }, collectionName);
    }

    static find(conditions = {}) {
      return new MockQuery(collectionName, conditions, false);
    }

    static findOne(conditions = {}) {
      return new MockQuery(collectionName, conditions, true);
    }

    static findById(id) {
      // Normalize to string
      const strId = id ? id.toString() : '';
      return new MockQuery(collectionName, { _id: strId }, true);
    }

    static async findByIdAndUpdate(id, update, options = {}) {
      const strId = id ? id.toString() : '';
      const coll = dbInstance.collections[collectionName];
      const index = coll.findIndex(item => item._id === strId);
      if (index === -1) return null;

      const current = coll[index];
      // Apply updates (supports nested fields update or standard flat)
      const updatedData = { ...current, ...update, updatedAt: new Date() };
      coll[index] = updatedData;
      dbInstance.saveToDisk();

      return wrapDoc(updatedData, collectionName);
    }

    static async findByIdAndDelete(id) {
      const strId = id ? id.toString() : '';
      const coll = dbInstance.collections[collectionName];
      const index = coll.findIndex(item => item._id === strId);
      if (index === -1) return null;

      const deleted = coll.splice(index, 1)[0];
      dbInstance.saveToDisk();
      return wrapDoc(deleted, collectionName);
    }

    static async create(doc) {
      const coll = dbInstance.collections[collectionName];
      const newDoc = {
        _id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...doc
      };

      // User model specific password hashing
      if (collectionName === 'users' && newDoc.password) {
        newDoc.password = await bcrypt.hash(newDoc.password, 12);
      }

      coll.push(newDoc);
      dbInstance.saveToDisk();
      return wrapDoc(newDoc, collectionName);
    }

    static async insertMany(docs) {
      const coll = dbInstance.collections[collectionName];
      const created = [];
      for (const doc of docs) {
        const item = {
          _id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...doc
        };
        coll.push(item);
        created.push(wrapDoc(item, collectionName));
      }
      dbInstance.saveToDisk();
      return created;
    }

    static async deleteMany(conditions = {}) {
      const coll = dbInstance.collections[collectionName];
      if (Object.keys(conditions).length === 0) {
        dbInstance.collections[collectionName] = [];
      } else {
        dbInstance.collections[collectionName] = coll.filter(item => !matchCondition(item, conditions));
      }
      dbInstance.saveToDisk();
      return { deletedCount: coll.length - dbInstance.collections[collectionName].length };
    }

    static async countDocuments(conditions = {}) {
      const coll = dbInstance.collections[collectionName] || [];
      const filtered = coll.filter(item => matchCondition(item, conditions));
      return filtered.length;
    }
  };
}
