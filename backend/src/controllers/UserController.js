const userService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {

            const { username, email } = req.body;
            
            const newUser = await userService.registerUser(username, email);
            
            res.status(201).json({ 
                message: "Utilizator creat cu succes!", 
                user: newUser 
            });
        } catch (error) {
            
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();