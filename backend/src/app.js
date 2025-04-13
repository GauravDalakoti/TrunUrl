import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import urlRoutes from "./routes/url.routes.js"
import { redirectToUrl } from "./controllers/url.controller.js"

const app = express();

app.use(cors({ credentials: true, methods: ["POST", "GET", "PATCH", "DELETE"], origin: process.env.CORS_ORIGIN }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use(cookieParser())

// user routes
app.use("/api/v1/users", userRoutes)

// url routes
app.use("/api/v1/urls", urlRoutes)

//redirect route
app.use("/:shortId", redirectToUrl)

export { app }