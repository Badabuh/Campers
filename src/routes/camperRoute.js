import { Router } from 'express';
import {
  getCamperById,
  getCampers,
  getCamperReviews,
  createBookingRequest,
} from '../controllers/camperController.js';
import { celebrate } from 'celebrate';
import {
  getCamperByIdValidation,
  getCampersValidation,
  getCamperReviewsValidation,
  createBookingRequestValidation,
} from '../validations/camperValidation.js';

const router = Router();

router.get('/', celebrate(getCampersValidation), getCampers);
router.get('/:camperId', celebrate(getCamperByIdValidation), getCamperById);
router.get(
  '/:camperId/reviews',
  celebrate(getCamperReviewsValidation),
  getCamperReviews,
);
router.post(
  '/:camperId/booking-requests',
  celebrate(createBookingRequestValidation),
  createBookingRequest,
);

export default router;
