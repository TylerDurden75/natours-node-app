const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Middleware running before createOne
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.checkIfAuhtor = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (req.user.role !== 'admin') {
    if (review.user.id !== req.user.id)
      return next(new AppError(`You can't edit someone's review`, 403));
  }
  next();
};

// ROUTES HANDLER
exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
