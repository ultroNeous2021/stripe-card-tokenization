const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const Model = require('../model/model')
const { isEmptyObject } = require('../utils/helper')

//Post Method
router.post('/card-tokenized', async (req, res) => {
  if (!isEmptyObject(req.body)) {
    const { card_token = 'tok_visa' } = req.body
    await stripe.customers.createSource(
      'cus_PYnul39njqjdkJ', // instead if static user there will be original stripe user id
      {
        source: card_token // instead of static token there will be a token from mobile app
      },
      async (err, response) => {
        if (err) {
          return res.status(400).json({ message: err.message })
        } else if (response) {
          try {
            const data = new Model({
              token: response.id
            })
            data.save()
            res.status(200).json({
              message: 'Your Card has been successfully added',
              data
            })
          } catch (error) {
            res.status(400).json({ message: error.message })
          }
        } else {
          res.status(400).json({ message: 'Something went wrong!' })
        }
      }
    )
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
})

module.exports = router
