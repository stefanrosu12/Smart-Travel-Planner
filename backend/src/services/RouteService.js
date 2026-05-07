const routeRepository = require('../repositories/RouteRepository');

class RouteService {
    async addRoute(title, promptUsed, places) {

        if (!title || !promptUsed || !places) {
            throw new Error("Titlul, prompt-ul și lista de locații sunt obligatorii!");
        }

        const newRoute = await routeRepository.createRoute({
            title: title,
            prompt_used: promptUsed,
            places: places 
        });

        return newRoute;
    }

    async getRoutes() {
        return await routeRepository.getAllRoutes();
    }
}

module.exports = new RouteService();