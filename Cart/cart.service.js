const Cart = require('./Cart/cart')

module.exports.list = async function () {
  return await Cart.find().populate('product')
}

module.exports.create = async function (payload) {
  try {
    const { productId, quantity } = payload
    const cartItem = await Cart.findOne({ product: productId })
    if (cartItem) {
      cartItem.quantity += quantity
      return await cartItem.save()
    } else {
      const newCartItem = new Cart(payload)
      return await newCartItem.save()
    }
  } catch (error) {
    // Handle error
  }
}

