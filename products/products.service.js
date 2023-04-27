const Products = require("./products");

module.exports.list = async function list() {
  return await Products.find();
};

module.exports.create = async function create(payload) {
  try {
    let product = new Products(payload);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

module.exports.get = async function get(id) {
  return await Products.findOne({ p_id: id });
};

module.exports.update = async function update(id, payload) {
  return await Products.findByIdAndUpdate({ p_id: id }, payload);
};

module.exports.delete = async function del(id) {
  return await Products.findByIdAndDelete(id);
};
