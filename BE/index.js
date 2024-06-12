const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const status = {
  success: 1,
  failed: 0,
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post("/coupon", async (req, res) => {
  console.log("coming req")
  // getting coupon from BE
  try {
    // We will be coding here
    const { coupon } = req.body;
    await sleep(2000);
    console.log(coupon);
    if (coupon === "NEWUSER") {
      res.json({
        status: status.success,
        amount: 30,
        message: "Applied Successfully",
      });
    } else {
      res.json({ status: status.failed,amount:0, message: "Invalid Coupon" });
      //res.json({ status: status.failed, message: "Invalid Coupon" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: error.toString(),
        message: "Could not process your request",
      });
  }
});
app.post("/points", async (req, res) => {
  console.log("cominggg")
  // getting coupon from BE
  try {
    // get parameter from request
    const { points } = req.body;
    await sleep(2000);

    // res.json({ points });
    res.json({
      status: status.success,
      amount: points,
      message: "Points Used  Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
app.post("/checkout", async (req, res) => {
  // getting coupon from BE
  try {
    // get parameter from request
    const {
      paymentInfo,
      shippingAddress,
      couponAmount,
      appliedPointDiscount,
      selectedPaymentOption,
    } = req.body;
    await sleep(4000);

    // res.json({ points });
    res.json({
      status: status.success,
      amount:'',
      message: "Order Placed  Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
