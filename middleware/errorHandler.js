const debugEnv = process.env.NODE_ENV === "development"

module.exports = function errorHandler(err, req, res, next) {
  // Always log the error on the server for debugging
  console.error(err)

  const status = err.status || 500

  // If the client accepts HTML (browser) and this is not an API JSON request, render the error view
  if (req.accepts && req.accepts("html") && !req.is("json")) {
    res.locals.message = err.message
    res.locals.error = debugEnv ? err : {}
    return res.status(status).render("error")
  }

  // Otherwise respond with JSON (suitable for API clients)
  const payload = {
    status: status,
    error: err.message || "Internal Server Error",
  }
  if (debugEnv) payload.details = err.stack || err

  res.status(status).json(payload)
}
const errorHandler = (req, res, next) => {}
