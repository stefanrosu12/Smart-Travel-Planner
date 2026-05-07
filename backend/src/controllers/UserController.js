const userService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const newUser = await userService.register(username, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            
            res.status(200).json({
                message: "Login reușit!",
                user: user
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            res.status(200).json({ message: "Logout reușit!" });
        } catch (error) {
            res.status(500).json({ error: "Eroare la logout." });
        }
    }
}

module.exports = new UserController();