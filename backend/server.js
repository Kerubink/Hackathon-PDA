import express from 'express';
import cors from 'cors'; 
import router from './src/routes/accommodation.routes.js';  

const app = express();

app.use(cors());  
app.use(express.json());  
app.use('/api', router);  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
