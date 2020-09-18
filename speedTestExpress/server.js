const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const speedService = require("./bin/index");
app.listen(port, () => {
    console.log("Sever is listening on the port number ", port);
    speedService.speed();
 });
