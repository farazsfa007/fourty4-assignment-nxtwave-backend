const User = require('../models/User');
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const users = await User.find(filter).skip(skip).limit(Number(limit));
    const total = await User.countDocuments(filter);
    res.status(200).json({ data: users, meta: { total, page: Number(page), limit: Number(limit) }});
  } catch (err) { next(err); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
    if (error) { error.status = 400; throw error; }

    const user = new User(value);
    await user.save();
    res.status(201).json(user);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });
    if (error) { error.status = 400; throw error; }

    const user = await User.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) { next(err); }
};
