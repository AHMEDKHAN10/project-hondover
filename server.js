const express = require('express');
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 4000;
const base = `${__dirname}/public`;

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BEOjo0bkAM9KMQU1XnQQs09JYrmKYQiMLyejxpsg37WIR3XU7928sk_M1ZZCsV7yKDr7P8_8Q1sbvWIXqbLuTJE";
const privateVapidKey = "RDqhKg47vhb6p_XTIJh3oUdxdtJuRMfIi_z5i-ji5cg";

webpush.setVapidDetails(
  "mailto:wisekhan10@gmail.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.use(bodyParser.json());
app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.send('hello world');
//   });
app.get('/', function (req, res) {
    res.sendFile(`${base}/index.html`);
  });
  app.get('/home', function (req, res) {
    res.sendFile(`${base}/index1.html`);
  });
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  app.get('/register-device', (req, res) => {
    res.sendFile(`${base}/register-device.html`);
  });
  app.get('/send-command', (req, res) => {
    res.sendFile(`${base}/send-command.html`);
  });
  app.get('/about', (req, res) => {
    res.sendFile(`${base}/about-me.html`);
  });
  app.get('/register', (req, res) => {
    res.sendFile(`${base}/registration.html`);
  });
  app.get('/control-devices', (req, res) => {
    res.sendFile(`${base}/control2.html`);
  });
  app.get('/login', (req, res) => {
    res.sendFile(`${base}/login.html`);
  });
  app.get('/tab', (req, res) => {
    res.sendFile(`${base}/plotly.html`);
  });

  app.get('/notification', (req, res) => {
    res.sendFile(`${base}/notify.html`);
  });
  // app.get('/notification', (req, res) => {
  //   res.sendFile(`${base}/notify.html`);
  // });

  app.get('/*', (req, res) => {
    res.sendFile(`${base}/404.html`);
  });
  