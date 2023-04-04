import { BadRequest } from '../../lib/exceptions'
import express from 'express'

const router = express.Router()

router.param('id', async (req, _res, next, id) => {
  try {
    if (!/^[\w-]+$/.test(id)) throw BadRequest
    req.video = await req.app.get('embetty').loadYoutubeVideo(id)
    next()
  } catch (e) {
    next(e)
  }
})

router.get('/:id-poster-image', async (req, res, next) => {
  try {
    const { data, type } = await req.video.getPosterImage()
    if (!data) return next()
    res.type(type)
    res.send(data)
  } catch (e) {
    next(e)
  }
})

router.get('/:id.amp', (req, res) => {
  const attributes = { ...req.query }
  res.render('video.html', { video: req.video, attributes })
})

router.get('/:id', (req, res) => {
  res.send(req.video)
})

export default router
