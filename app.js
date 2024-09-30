const express = require("express");
const ExpressError = require("./expressError");
const itemRoutes = require("./routes/items");
// const middleware = require("./middleware");

const app = express();
app.use(express.json());
app.use("/items", itemRoutes);


// 404 error handler
app.use(function(req, res) {
    return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function(err, req, res, next) {
    // default status is 500
    let status = err. status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

module.exports = app;