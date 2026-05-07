const userRepository = require('../repositories/UserRepository');

class UserService {
    async registerUser(username, email) {

        if (!username || !email) {
            throw new Error("Username-ul și Email-ul sunt obligatorii!");
        }

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Acest email este deja înregistrat!");
        }

        const newUser = await userRepository.createUser({
            username: username,
            email: email
        });

        return newUser;
    }
}

module.exports = new UserService();