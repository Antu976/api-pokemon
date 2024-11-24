import { Router , Request , Response } from  "express" ; 
import { getAllPokemonControleur, getPokemonIdcontroleur, addPokemonControleur, modPokemonIdControleur, deletePokemonControleur} from "../controleurs/pokemonControleur";

const router = Router (); 

router.get("/", getAllPokemonControleur);
router.get("/:id", getPokemonIdcontroleur);
router.post("/add", addPokemonControleur);
router.put("/update/:id", modPokemonIdControleur);
router.delete("/:id", deletePokemonControleur);

export default router;