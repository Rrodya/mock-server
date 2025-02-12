import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import rpcProxy from "./routes/rpc-proxy.js";
import mockRouter from './routes/mock-server.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/stubs', express.static('stubs'));

// Подключаем роутеры
app.use('/mock-server', mockRouter)
app.use('/', rpcProxy);

// Обработка статических файлов для production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
