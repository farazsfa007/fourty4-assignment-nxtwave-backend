module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  // Joi validation error
  if (err.isJoi) return res.status(400).json({ message: err.details.map(d => d.message).join(', ') });

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });

  // Duplicate key (unique email)
  if (err.code === 11000) return res.status(409).json({ message: 'Duplicate field', fields: err.keyValue });

  // Custom status
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};
