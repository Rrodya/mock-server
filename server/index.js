import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import rpcProxy from "./routes/rpc-proxy.js";
import mockRouter from './routes/mock-server.js';
import log from "npmlog";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/mock-server', mockRouter)
app.use('/', rpcProxy);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`)

});
