import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  const query = req.query.keyword
    ? { $text: { $search: req.query.keyword }, isPublished: true }
    : { isPublished: true };
  const blogs = await Blog.find(query).sort('-createdAt');
  res.json({ success: true, blogs });
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }
  blog.views += 1;
  await blog.save();
  res.json({ success: true, blog });
};

export const createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, author: req.user._id, authorName: req.user.name });
  res.status(201).json({ success: true, blog });
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }
  res.json({ success: true, blog });
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Blog deleted' });
};
