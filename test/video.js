const {start} = require('@heise/request-promise-native-record')
const assert = require('assert')
const path = require('path')
const request = require('supertest')

start({ folder: path.join(__dirname, 'fixtures') })
const app = require('..')

describe('Video', () => {
  describe('Youtube', () => {
    it('should respond with 404', async () => {
      await request(app)
        .get('/video/youtube/123/profile-image')
        .expect(404)
    })

    it('should provide the poster image', async () => {
      const response = await request(app)
        .get('/video/youtube/m6UOo2YGbIE-poster-image')
        .expect('Content-Type', /jpeg/)
        .expect(200)

      assert.ok(Buffer.isBuffer(response.body))
      const imageLength = Buffer.byteLength(response.body)
      assert.ok(imageLength > 100)
      assert.equal(response.headers['content-length'], imageLength)
    })
  })

  describe('Vimeo', () => {
    it('should respond with 400', async () => {
      await request(app)
        .get('/video/vimeo/abc')
        .expect(400)
    })

    it('should respond with 404', async () => {
      await request(app)
        .get('/video/vimeo/9')
        .expect(404)
    })

    it('should provide the poster image', async () => {
      const response = await request(app)
        .get('/video/vimeo/223099532-poster-image')
        .expect('Content-Type', /jpeg/)
        .expect(200)

      assert.ok(Buffer.isBuffer(response.body))
      const imageLength = Buffer.byteLength(response.body)
      assert.ok(imageLength > 100)
      assert.equal(response.headers['content-length'], imageLength)
    })
  })

  describe('Facebook', () => {
    it('should respond with 400', async () => {
      await request(app)
        .get('/video/facebook/abc')
        .expect(400)
    })

    it('should respond with 404', async () => {
      await request(app)
        .get('/video/facebook/9')
        .expect(404)
    })

    it('should provide the poster image', async () => {
      const response = await request(app)
        .get('/video/facebook/10156049485672318-poster-image')
        .expect('Content-Type', /jpeg/)
        .expect(200)

      assert.ok(Buffer.isBuffer(response.body))
      const imageLength = Buffer.byteLength(response.body)
      assert.ok(imageLength > 100)
      assert.equal(response.headers['content-length'], imageLength)
    })
  })
})