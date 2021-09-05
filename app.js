import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

import Router from './Apis/api.routers.js'

dotenv.config()
const app = express()

app.set('views', 'view');
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/plant_store", Router)
app.use("*", (req, res) => res.status(404).json({ error: "Page Not found" }))

const port = 3000;
mongoose.connect(process.env.DATABASE_URI)
    .then( () => { app.listen(port, () => console.log(`connected to DB\napp listening on port ${port}!`))})
    .catch((err) => console.error(err));

