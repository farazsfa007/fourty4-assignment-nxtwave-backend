const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: { type: String, default: '' },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: { type: GeoSchema, required: true }
}, { _id: false });

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true, trim: true },
  phone: { type: String, default: '' },
  company: { type: CompanySchema, required: true },
  address: { type: AddressSchema, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
