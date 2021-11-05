const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Middleware running before createOne
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.isBookedTour = catchAsync(async (req, res, next) => {
  const { tour, user } = req.body;
  const booking = await Booking.find({ tour, user });
  if (!(booking.length > 0))
    return next(new AppError('Please book tour before reviewing!', 400));
  next();
});

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
