const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const isloggedin = require('../middlewares/isLoggend');


router.get('/', isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('cart.product');

    if (!user) {
      return res.status(404).send("User not found.");
    }

    let bill = 0;
    user.cart.forEach(item => {
      bill += item.product.price + 20 - item.product.discount;
    });

    res.render('cart', {
      user: user,
      bill: bill
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

router.get('/remove/:productId', isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    await User.findByIdAndUpdate(userId, {
      $pull: {
        cart: { product: new mongoose.Types.ObjectId(productId) }
      }
    });

    res.redirect('/cart');
  } catch (err) {
    console.error('Failed to remove item:', err);
    res.status(500).send('Error removing item from cart');
  }
});

module.exports = router;
