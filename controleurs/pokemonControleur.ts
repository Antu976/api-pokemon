import express, { Express, Request, Response } from "express";
import logger from '../logger';
import { getAllPokemon, getPokemonId, addPokemon, modPokemonId, deletePokemon } from "../modeles/pokemonModel";
import { log } from "console";

export const getAllPokemonControleur = async(req: Request, res: Response) => {
    try {
        const pokemons = await getAllPokemon();
        res.json(pokemons);

    } catch (err) {
        logger.error(`Erreur lors de la récupération des pokémons : ${err}`);
        res.status(500).send("Erreur du serveur");
    }
};

export const getPokemonIdcontroleur = async (req: Request, res:Response) => {
    try {
        const id = Number(req.params.id);
        const pokemonId = await getPokemonId(id);
        res.json(pokemonId);
    
       } catch(err) {
        console.error(err);
        res.status(500).send('server error')
       }
};

export const addPokemonControleur = async (req: Request, res: Response) => {
    try {
        const { id, identifier, species_id, height, weight, base_experience, order, is_default } = req.body;
        await addPokemon(id, identifier, species_id, height, weight, base_experience, order, is_default);
        res.status(201).json({ message: " pokemon est crée" });
    } catch (err) {
        logger.error(`Le Pokémon n'a pas été créé : ${err}`);
        res.status(500).send("Erreur du serveur");
    }
};

export const modPokemonIdControleur = async(req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const {identifier, species_id, height, weight, base_experience, order, is_default } = req.body;
        await modPokemonId(id, identifier, species_id, height, weight, base_experience, order, is_default);
        res.status(200).send('mis à jour avec succes');
        logger.info('mis à pris en compte');
    } catch(err) {
        logger.error(`mis a jour échoue : ${err}`);
        res.status(500).send("Erreur du serveur");
    }
};

export const deletePokemonControleur = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        await deletePokemon(id);
        res.status(204).send("Pokémon supprimé");
    } catch (err) {
        logger.error(`Erreur lors de la suppression du Pokémon : ${err}`);
        res.status(500).send("Erreur du serveur");
    }
};