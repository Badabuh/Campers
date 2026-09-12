import { Joi, Segments } from 'celebrate';
import { formConstant } from '../constants/formConstant.js';
import { transmissionConstant } from '../constants/transmissionConstant.js';
import { engineConstant } from '../constants/engineConstant.js';

export const getCampersValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.alternatives()
      .try(Joi.number().integer().min(1), Joi.string().trim().pattern(/^\d+$/))
      .custom((value) => Number(value))
      .default(1),
    perPage: Joi.alternatives()
      .try(
        Joi.number().integer().min(1).max(100),
        Joi.string().trim().pattern(/^\d+$/),
      )
      .custom((value) => Number(value))
      .default(4),
    location: Joi.string().trim(),
    form: Joi.string()
      .valid(...formConstant)
      .optional(),
    transmission: Joi.string()
      .valid(...transmissionConstant)
      .optional(),
    engine: Joi.string()
      .valid(...engineConstant)
      .optional(),
  }),
};

export const getCamperByIdValidation = {
  [Segments.PARAMS]: Joi.object({
    camperId: Joi.string().hex().length(24).required(),
  }),
};

export const getCamperReviewsValidation = {
  [Segments.PARAMS]: Joi.object({
    camperId: Joi.string().hex().length(24).required(),
  }),
};

export const createBookingRequestValidation = {
  [Segments.PARAMS]: Joi.object({
    camperId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().trim().required(),
  }).required(),
};
