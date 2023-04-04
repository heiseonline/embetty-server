const BadRequest = new Error()
BadRequest.statusCode = 400

const NotFound = new Error()
NotFound.statusCode = 404

const Forbidden = new Error()
Forbidden.statusCode = 403

export { BadRequest, Forbidden, NotFound }
