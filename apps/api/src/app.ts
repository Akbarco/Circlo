import express from "express"
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = express()

// ===== MIDDLEWARE =====
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

// ===== ROUTES =====
app.get("/", (_req, res) => {
  res.send("Express + TypeScript Server")
})

app.use("/api", userRoute)


app.use(errorHandler)

export default app
