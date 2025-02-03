const express = require("express");
const handlebars = require('handlebars');
const path = require("path");
const fs = require("fs");
const exphbs = require("express-handlebars"); // Import express-handlebars

const app = express();
const PORT = 3000;

// Import data.json
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/data.json"), "utf-8")
);

// Daftarkan folder helpers dan helper JSON
const jsonHelper = require("./helpers/jsonHelper");
jsonHelper(handlebars);

// Konfigurasi express-handlebars
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: [
      path.join(__dirname, "views/partials"),
      path.join(__dirname, "views/components"),
    ],
    handlebars: handlebars,
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Rifki Virzya", data: data });
});

app.get("/project", (req, res) => {
  res.sendFile(path.join(__dirname, `/views/components/popup-project.hbs`));
});

app.get("/research", (req, res) => {
  res.sendFile(path.join(__dirname, `/views/components/popup-research.hbs`));
});

// Jalankan server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
module.exports = app;
