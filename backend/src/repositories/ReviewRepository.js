const Review = require('../models/Review');

class ReviewRepository {
    async createReview(reviewData) {
        return await Review.create(reviewData);
    }
}

module.exports = new ReviewRepository();