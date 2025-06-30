const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const billingRouter = require("./routes/billingRoute");

app.use(cors(
    {
        origin: "https://green-cart-flax.vercel.app/",
        credentials: true
    }
))
app.use(cookieparser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/billing", billingRouter);

app.get("/",(req,res)=>{
    res.send({
        activeStatus: true,
        error: false
    })
})

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Mongoose connected");
        app.listen(process.env.PORT,()=>{
            console.log("Server is up and running");
        })
    })
    .catch((error)=>{
        console.log(error);
    })