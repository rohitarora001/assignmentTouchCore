const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express();
var corsOptions = {
    origin: 'https://assignment-touch-core-frontend.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

const connectDB = require('./db/conn');
dotenv.config({ path: './config/config.env' });
connectDB();

const form = require('./routes/Forms.routes');

// Express Configurations
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Routes
app.use("/api/form", form);

app.listen(port, () => {
    console.log(`Connected on ${port} `)
})