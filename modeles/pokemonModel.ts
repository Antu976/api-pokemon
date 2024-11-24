import express, { Express, Request, Response } from "express";
import mysql from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();
const pool = mysql.createPool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 3306,
    database: 'POKEDEX' 
});


export const getAllPokemon = async () => {
    const [rows] = await pool.query("SELECT * FROM pokemon");
    return rows;
  };

  export const getPokemonId = async(id: number) => {
    const [rows] = await pool.query(`SELECT * FROM pokemon WHERE  id = ${id}`);
    return [rows];
    
  };

 export const addPokemon = async (id:number, identifier:  string, species_id: number, height: number, weight:number, base_experience:number, order:number, is_default:number) => {
        const query = "INSERT INTO pokemon (id, identifier, species_id, height, weight, base_experience, `order`, is_default) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
        await pool.query(query, [id, identifier, species_id, height, weight, base_experience, order, is_default]);
        
};

export const modPokemonId = async (id:number, identifier:  string, species_id: number, height: number, weight:number, base_experience:number, order:number, is_default:number) => {
    const query = "UPDATE pokemon SET identifier =?, species_id =?, height = ?, weight = ?, base_experience = ?, `order` =?, is_default =? WHERE id = ?";
    await pool.query(query, [id, identifier, species_id, height, weight, base_experience, order, is_default]);
}

export const deletePokemon = async (id: number) => {
   const query = await pool.query(`DELETE FROM pokemon WHERE id = ${id}`);
};