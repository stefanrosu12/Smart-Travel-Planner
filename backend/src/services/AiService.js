const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function genereazaRuta(oras, dorintaUser) {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });
    
    // Am adăugat "descriere" în prompt ca să ai informații reale în popup-ul de pe hartă
   const promptComplet = `
        Ești un agent de turism. Utilizatorul vrea o excursie în orașul ${oras} cu specificul: "${dorintaUser}".
        Generează o listă de 3 locații turistice, restaurante sau activități reale.
        Răspunde strict cu un array JSON, unde fiecare element are proprietățile:
        "nume_locatie", 
        "descriere",
        "tip" (Exemple: "Restaurant", "Muzeu", "Parc", "Monument", "Cafenea", "Promenadă").
    `;

    try {
        const result = await model.generateContent(promptComplet);
        const locatiiJSON = JSON.parse(result.response.text());
        
        // Căutăm coordonatele
        for (const loc of locatiiJSON) {
            // AICI ERA BUG-UL: Am scos ", România" ca să poată căuta oriunde în lume!
            const query = encodeURIComponent(`${loc.nume_locatie}, ${oras}`);
            const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

            const response = await fetch(url, {
                headers: { "User-Agent": "ProiectFacultateTravelAdviser/1.0" }
            });
            const data = await response.json();

            if (data && data.length > 0) {
                loc.latitudine = data[0].lat;
                loc.longitudine = data[0].lon;
            }
            // Pauză de 1 secundă ca să nu ne blocheze OpenStreetMap
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return locatiiJSON; 

    } catch (error) {
        console.error("Eroare în AiService:", error);
        throw error; 
    }
}

module.exports = { genereazaRuta };