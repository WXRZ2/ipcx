const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

async function getPublicIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

app.get('/', async (req, res) => {
  const ip = await getPublicIP();
  const time = new Date().toISOString();

  res.send(`
    <html>
      <head>
        <title>Current Public IP</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
          .ip { font-size: 2.2rem; font-weight: bold; color: #2563eb; margin: 20px 0; }
          .time { color: #666; font-size: 0.95rem; }
        </style>
      </head>
      <body>
        <h1>Current Public IP</h1>
        <div class="ip">${ip}</div>
        <div class="time">Checked at: ${time}</div>
        <hr>
        <p>Refresh the page to check again.</p>
      </body>
    </html>
  `);
});

app.get('/raw', async (req, res) => {
  const ip = await getPublicIP();
  res.type('text/plain').send(ip);
});

app.get('/json', async (req, res) => {
  const ip = await getPublicIP();
  res.json({
    ip,
    time: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`IP Checker running on port ${port}`);
});
