const fs = require("fs");
const http = require("http");

let id = 0;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/fileUpload") {
    console.log(req.headers["content-type"].split("/"));
    const fileType = req.headers["content-type"].split("/");
    const writeStream = fs.createWriteStream(
      `${id}-${fileType[0]}.${fileType[1]}`
    );
    req.pipe(writeStream);
    id++;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ meassage: "upload success!" }));
    res.end();
  }
});

server.listen(5500, () => {
  console.log("server is listening at port 5500");
});
