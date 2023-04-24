const router = require('express').Router()



router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const cartItem = await Cart.findOne({ product: productId })
    if (cartItem) {
      cartItem.quantity += quantity
      await cartItem.save()
      res.status(200).json(cartItem)
    } else {
      const newCartItem = new Cart({ product: productId, quantity })
      await newCartItem.save()
      res.status(201).json(newCartItem)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('product')
    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.product.p_price * item.quantity
    }, 0)
    const taxes = subtotal * 0.05
    const total = subtotal + taxes
    res.status(200).json({ cart: cartItems, subtotal, taxes, total })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
