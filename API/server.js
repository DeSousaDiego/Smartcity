const cors = require('cors');
const Router = require('./route');
const express = require('express');
const internalIP = require('internal-ip');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('./upload'));
app.use(Router);
const IP = internalIP.v4.sync();
app.listen(port, internalIP, () => {
    console.log(`Server is running on adresse : http://${IP}:${port}`);
});