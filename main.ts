import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import logger from './logger';
import mysql from 'mysql2/promise';

import pokemonRoutes from './routes/pokemonRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const pool = mysql.createPool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 3306,
    database: 'POKEDEX' 
});


app.use("/pokemon", pokemonRoutes);

// Route principale
app.get("/", (req, res) => {
    logger.info("Route principale");
    res.send("Bienvenue dans notre API des pokemoons !");
});


app.listen(port, () => {
    logger.info(`Notre serveur tourne sur http://localhost:${port}`);
});