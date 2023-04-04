import facebook from './video/facebook'
import vimeo from './video/vimeo'
import youtube from './video/youtube'
import express from 'express'

const router = express.Router()

router.use('/youtube', youtube)
router.use('/vimeo', vimeo)
router.use('/facebook', facebook)

export default router
