import { Forbidden } from '../lib/exceptions'
import cors from 'cors'
import debug from 'debug'
import express from 'express'
import fs from 'fs'
import tweet from './tweet'
import video from './video'

const router = express.Router()

function getValidOrigins() {
  const _validOrigins = process.env.VALID_ORIGINS || ''
  return _validOrigins.length > 0 ? _validOrigins.split(',') : []
}

router.use(cors({
  origin: (origin, cb) => {
    const validOrigins = getValidOrigins()
    if (validOrigins[0] === '*' || !origin || validOrigins.indexOf(origin) !== -1) return cb(null, true)

    debug(`Invalid origin: ${origin}, Valid:, ${validOrigins}`)
    cb(Forbidden)
  }
}))

router.use('/embetty.js', (_req, res, next) => {
  const embettyPath = require.resolve('@heise/embetty/dist/embetty.js')
  res.type('application/javascript')
  fs.createReadStream(embettyPath, { encoding: 'utf8' }).pipe(res)
})
router.use('/tweet', tweet)
router.use('/video', video)

router.get('/version', (_req, res) => {
  res.send(require('../package.json').version)
})

export default router
