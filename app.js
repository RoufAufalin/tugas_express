const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const productRouter = require("./routes/product")
const todoRouter = require("./routes/todos")

const db = require("./config/db_connection")

const app = express()

app.use(cors())

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
// Product Route
app.use("/product", productRouter)
app.use("/todos", todoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// centralized error handler (renders HTML for browsers, JSON for API clients)
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

module.exports = app
