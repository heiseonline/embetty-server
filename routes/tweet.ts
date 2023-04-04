import { BadRequest, NotFound } from '../lib/exceptions'
import express from 'express'

const router = express.Router()

router.param('id', async (req, _res, next, id) => {
  try {
    if (!/^\d+$/.test(id)) throw BadRequest
    req.tweet = await req.app.get('embetty').loadTweet(id)
    next()
  } catch (e) {
    next(e)
  }
})

router.param('number', (_req, _res, next, number) => {
  if (!/^\d+$/.test(number)) return next(BadRequest)
  next()
})

router.get('/:id-profile-image', async (req, res, next) => {
  try {
    const image = await req.tweet.getProfileImage()
    if (!image) return next(NotFound)
    res.type(image.type)
    res.send(image.data)
  } catch (e) {
    next(e)
  }
})

router.get('/:id-link-image', async (req, res, next) => {
  try {
    const image = await req.tweet.getLinkImage()
    if (!image) return next(NotFound)
    res.type(image.type)
    res.send(image.data)
  } catch (e) {
    next(e)
  }
})

router.get('/:id-images-:number', async (req, res, next) => {
  try {
    const image = await req.tweet.getImage(req.params.number)
    if (!image) return next(NotFound)
    res.type(image.type)
    res.send(image.data)
  } catch (e) {
    next(e)
  }
})

router.get('/:id.amp', (req, res) => {
  res.render('tweet.html', { tweet: req.tweet })
})

router.get('/:id', (req, res) => {
  res.send(req.tweet)
})

export default router
