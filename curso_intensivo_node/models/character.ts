import { z } from "zod"

// Esquema de validación para un personaje utilizando Zod
const CharacterSchema = z.object({
	name: z.string().min(3),
	lastName: z.string().min(4)
})

// Tipo de Character basado en el esquema de Zod
export type Character = z.infer<typeof CharacterSchema> & {
	id: number
}

// Mapa que almacena los personajes, utilizando un ID numérico como clave
const characters: Map<number, Character> = new Map()

/**
 * Obtiene todos los personajes almacenados.
 * @returns {Character[]} Un arreglo de todos los personajes.
 */
export const getAllCharacters = (): Character[] => {
	return Array.from(characters.values())
}

/**
 * Obtiene un personaje por su ID.
 * @param {number} id - El ID del personaje a buscar.
 * @returns {Character | undefined} El personaje si existe, o `undefined` si no se encuentra.
 */
export const getCharacterById = (id: number): Character | undefined => {
	return characters.get(id)
}

/**
 * Agrega un nuevo personaje al mapa de personajes.
 * @param {Character} character - El personaje a agregar.
 * @returns {Character} El personaje agregado con su ID asignado.
 */
export const addCharacter = (character: Character): Character => {
	const newCharacter: Character = {
		...character,
		id: new Date().getTime() // Usamos el timestamp como ID único
	}
	characters.set(newCharacter.id, newCharacter)

	return newCharacter
}

/**
 * Actualiza un personaje existente.
 * @param {number} id - El ID del personaje a actualizar.
 * @param {Character} updatedCharacter - Los nuevos datos para el personaje.
 * @returns {Character | undefined} El personaje actualizado, o `undefined` si el personaje no existe.
 */
export const updateCharacter = (id: number, updatedCharacter: Character): Character | undefined => {
	if (!getCharacterById(id)) {
		return undefined
	}
	characters.set(id, updatedCharacter)

	return updatedCharacter
}

/**
 * Elimina un personaje por su ID.
 * @param {number} id - El ID del personaje a eliminar.
 * @returns {boolean} `true` si el personaje fue eliminado, o `false` si no existía.
 */
export const deleteCharacter = (id: number): boolean => {
	if (!getCharacterById(id)) {
		return false
	}
	characters.delete(id)
	return true
}
