const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { movieRoutes } = require("./routes/movie");
const { authRoutes } = require("./routes/auth");

const { JWT_SECRET, PORT } = process.env;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
} else if (!PORT) {
    throw new Error("Missing PORT env var. Set it and restart the server");
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', authRoutes);
app.use('/api/v1', movieRoutes);

app.use((error, _, res, __) => {
    console.error(
      `Error processing request ${error}. See next message for details`
    );

    console.error(error);
  
    return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
    console.log(`movie api running at port ${PORT}`);
});