const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const dns = require('dns2')
const requestIp = require('request-ip')
const superchargeRequestIp = require('@supercharge/request-ip')

app.use(cors())
//app.set('trust proxy', true);

const ipaddress = {}

/* dns.lookup('www.medzgo.com', (error, add, family) => {
    ipaddress['dnsip'] = add;
}) */

app.use((req, res, next) => {
  req.ip4 = req.headers['x-forwarded-for'] || getClientIp(req) || 1.1.1.1;
  console.log(req.ip);
  next();
});


app.get('/getip', (req, res) => {
    ipaddress["middleware"] = req.ip4
    ipaddress["request-ip"] = requestIp.getClientIp(req)
    ipaddress["x-forwarded-for"] = req.headers['x-forwarded-for']
    ipaddress["remoteAddress"] = req.socket.remoteAddress
    ipaddress["@supercharge/request-ip"] = superchargeRequestIp.getClientIp(req)
    res.status(200).json({ipaddress});
});

app.listen(process.env.PORT, () => {
  console.log(`listening at PORT: ${process.env.PORT}`)
});
