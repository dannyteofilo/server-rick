import axios from 'axios';

export const searchByName = async (req, res) => {
    try {
        const query = req.query.q; // Obtener el parámetro de búsqueda de la URL

        // Realizar una solicitud GET a la API de Rick and Morty con el parámetro de búsqueda
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`);

        const results = response.data.results; // Obtener los resultados de la búsqueda

        res.json(results); // Devolver los resultados como respuesta JSON
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
};
