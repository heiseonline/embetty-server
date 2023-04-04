import { NotFound } from './lib/exceptions'
import { URL } from 'url'
import Embetty from '@heise/embetty-base'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import nunjucks from 'nunjucks'
import routes from './routes'

const app = express()

nunjucks
  .configure('views', {
    autoescape: true,
    express: app
  })
  .addGlobal('urlFor', (path: string) => {
    const urlBase = process.env.URL_BASE
    if (!urlBase) throw new Error('URL_BASE not set.')
    const url = new URL(path, urlBase)
    return url.toString().replace(/\/$/, '')
  })

app.set('embetty', new Embetty())

app.use(logger(process.env.NODE_ENV === 'production' ? 'short' : 'dev', {
  skip: (_req, _res) => process.env.NODE_ENV === 'test'
}))

app.use(helmet({
  frameguard: false,
  hsts: false,
}))
app.use('/', routes)

app.use((_req, _res, next) => {
  next(NotFound)
})

app.use((err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500
  if (err.statusCode >= 500) console.error(err)
  res.sendStatus(err.statusCode)
})

module.exports = app
