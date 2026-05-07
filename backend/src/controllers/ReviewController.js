const reviewService = require('../services/ReviewService');

class ReviewController {
    async add(req, res) {
        try {
            const { userId, routeId, rating, comment } = req.body;
            
            const newReview = await reviewService.addReview(userId, routeId, rating, comment);
            
            res.status(201).json({ 
                message: "Review adăugat cu succes!", 
                review: newReview 
            });
        } catch (error) {
            
            res.status(403).json({ error: error.message });
        }
    }
}

module.exports = new ReviewController();