// Express Setup
const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

const dbConnection = require("./config/config");

// Template Engine
const hbs = require("hbs");

// Setup Routing Path Directory
app.use(express.json());
app.use(express.static("express"));

/* app.use (method Untuk menggunakan HOF pada framework Express)
   ("/public", express.static(path.join(__dirname, "public")))
   ("/public") (Path yang akan di tuju)
   express.static(-----) (build in function pada express untuk dapat membaca static path directory)
   path.join(__dirname, "public")) (Build in function untuk mengabungkan path yang sudah di setup seperti ("/public"), "public")
*/

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/patrials");

// Init Var for check status
var isLogin = false;

// End Point Routing
/* Method itu ada 4 jenis : 
      - Get : Berfungsi Untuk mengambil atau biasa di sebut fetching data (Mengambil data dari database)
      - Post : Berfungsi untuk memasukan data kedalam database atau biasa di sebut store data to database
      - Put or Patch : Untuk mengupdate atau merubah data
      - Delete : Untuk Menghapus data
      
      app.METHOD("/Path endpoint", callback(req, res){ expected your function })
*/

app.get("/", function (req, res) {
  res.render("index", { title: "Articles", isLogin });
});

app.get("/article/:id", function (req, res) {
  var { id } = req.params;
  res.render("article", { title: "Articles", isLogin, id });
});

app.get("/login", function (req, res) {
  res.render("login", { title: "Login", auth: true });
});

app.get("/register", function (req, res) {
  res.render("register", { title: "Register", auth: true });
});

app.get("/article-add", function (req, res) {
  res.render("addArticle", { title: "Add Article", isLogin });
});

// get data with Query
// app.get("/", function (req, res) {
//   const query = `SELECT * FROM [nama_tb] order by id desc;`;

//   dbConnection.getConnection((err, conn) => {
//     if (err) throw err;
//     conn.query(query, (err, results) => {
//       if (err) throw err;

//       var article = [];

//       for (var result of results) {
//         article.push({
//           ...result,
//         });
//       }

//       if (article.length == 0) {
//         article = false;
//       }

//       res.render("index", {
//         title: "Articles",
//         isLogin: req.session.isLogin,
//         article,
//       });
//     });
//   });
// });

// Setup PORT to surfing to web server
const server = http.createServer(app);
const port = 5000;
server.listen(port);
console.log("Server listening on port " + port);

// Logic Checking Status Variable isLogedin
hbs.handlebars.registerHelper("isAuth", function (value) {
  if (value == true) {
    return false;
  } else {
    return true;
  }
});
