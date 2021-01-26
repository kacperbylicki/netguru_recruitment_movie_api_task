const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config()

const { movieRoutes } = require("./routes");

const { 
    JWT_SECRET, 
    PORT
} = process.env;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
} else if (!PORT) {
    throw new Error("Missing PORT env var. Set it and restart the server");
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', movieRoutes);

app.listen(PORT, () => {
    console.log(`movie api running at port ${PORT}`);
});