const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// CORECTAT: Am scos ghilimelele care stricau cheia
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function genereazaRuta(oras, dorintaUser) {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });
    
    const promptComplet = `
        Ești un agent de turism. Utilizatorul vrea o excursie în orașul ${oras} cu specificul: "${dorintaUser}".
        Generează o listă de 3 atracții turistice potrivite.
        Răspunde strict cu un array JSON, unde fiecare element are proprietatea "nume_locatie".
    `;

    try {
        const result = await model.generateContent(promptComplet);
        const locatiiJSON = JSON.parse(result.response.text());
        
        // Căutăm coordonatele
        for (const loc of locatiiJSON) {
            const query = encodeURIComponent(`${loc.nume_locatie}, ${oras}, România`);
            const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

            const response = await fetch(url, {
                headers: { "User-Agent": "ProiectFacultateTravelAdviser/1.0" }
            });
            const data = await response.json();

            if (data && data.length > 0) {
                loc.latitudine = data[0].lat;
                loc.longitudine = data[0].lon;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return locatiiJSON; 

    } catch (error) {
        console.error("Eroare în AiService:", error);
        throw error; 
    }
}

module.exports = { genereazaRuta };