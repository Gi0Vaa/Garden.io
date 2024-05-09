const express = require('express'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

//log delle richieste
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} dal client ${req.ip}:${req.socket.remotePort}`);
    next();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});