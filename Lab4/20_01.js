const express = require("express");
const parser = require("body-parser");

const hallRouter = require("./routes/hallRouter");
const sports_kindRouter = require("./routes/sports_kindRouter");
const trainerRouter = require("./routes/trainerRouter");
const facilityRouter = require("./routes/facilityRouter");


const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.set("view engine", "hbs");
app.use(parser.json());

app.use(parser.urlencoded({ extended: false }));

app.use("/hall", hallRouter);
app.use("/sports_kind", sports_kindRouter);
app.use("/trainer", trainerRouter);
app.use("/facility", facilityRouter);


app.use((req, res, next) => {
  res.status(404).send("Not Found rout");
});
