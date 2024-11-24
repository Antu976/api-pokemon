// on importenotre framework avec la requete et la response 
import express, {Express, Request, Response} from "express";
//notre variable d'environnement importer 
import dotenv from "dotenv";
import logger from './logger';


import mysql from 'mysql2/promise';


// const mysql = require('mysql2');
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
// const connexion = mysql.createPool({ 
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     host: 'localhost',
//     port: 3306,
//     database: 'POKEDEX' 
// }); 
   

// module.exports = {
//     query: (text: any, params: any) => pool.query(text, params)
// };
// const poolPromise = pool.promise();
//on creer notre route premiere route avec request et response
app.get("/", (req: Request, res: Response) => {
    logger.info("route principale")
    res.send("Bienvenue dans notre première API");
});

// app.get("/pokemon", async (req: Request, res: Response) => {
//    try {
//     const [getAllPokemon] = await connexion.query("SELECT * FROM pokemon");
//     res.json(getAllPokemon);

//    } catch(err) {
//     // console.error(err);
//     // res.status(500).send('server error')
//     logger.error(`Erreur lors de la récupération des pokémons : ${err}`);
//         res.status(500).send("Erreur du serveur");
//    }
// });

app.get("/pokemon", async (req: Request, res: Response) => {
    try {
        const [getAllPokemon] = await pool.query("SELECT * FROM pokemon");
      res.json(getAllPokemon);

    } catch (err) {
      logger.error(`Erreur lors de la récupération des pokémons : ${err}`);
      res.status(500).send("Erreur du serveur");
    }
  });


app.post("/add", async (req: Request, res: Response) => {
    try {
        const {id, identifier, species_id, height, weight, base_experience, order, is_default} = req.body;
        const query = "INSERT INTO pokemon (id, identifier, species_id, height, weight, base_experience, `order`, is_default) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
        await pool.query(query, [id, identifier, species_id, height, weight, base_experience, order, is_default]);
        res.status(201).json({
            message: "user created",
        });

       } catch(err) {
        logger.error(`le pokemon n'a pas été crée : ${err}`);
        res.status(500).send('server error')
       }
});

app.get("/pokemon/:id", async (req: Request, res:Response) => {
    try {
        let id = req.params.id;
        let [getPokemonId] = await pool.query(`SELECT * FROM pokemon WHERE  id = ${id}`);
        res.json(getPokemonId);
    
       } catch(err) {
        console.error(err);
        res.status(500).send('server error')
       }
});

app.delete("/pokemon/:id", async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let deletePokemonId = await pool.query(`DELETE FROM pokemon WHERE id = ${id}`);
        res.json(204).send(`l'utilisateur a été supprimé`)
    
       } catch(err) {
        console.error(err);
        res.status(500).send('server error')
       }
});



app.put("/pokemon/:id", async (req: Request, res:Response) => {
    try {
        let id = req.params.id;
        let [putPokemonId] = await pool.query(`UPDATE * FROM pokemon WHERE  id = ${id}`);
        res.json(putPokemonId);
        logger.info("mis à jour avec succèes")
    
       } catch(err) {
        console.error(err);
        res.status(500).send('server error')
       }
});





//on écoute le port en question 
// app.listen(port, () => {
//     console.log(`Notre serveur run en http://localhost:${port}`)
// })
app.listen(port, () => {
    logger.info(`Notre serveur tourne sur http://localhost:${port}`);
});