import { Camper } from '../models/camper.js';
import { BookingRequest } from '../models/bookingRequest.js';
import createHttpError from 'http-errors';
import { sendEmail } from '../utils/sendMail.js';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';

const toListItem = (camper) => ({
  id: camper._id.toString(),
  name: camper.name,
  price: camper.price,
  rating: camper.rating,
  location: camper.location,
  form: camper.form,
  length: camper.length,
  width: camper.width,
  height: camper.height,
  tank: camper.tank,
  consumption: camper.consumption,
  transmission: camper.transmission,
  engine: camper.engine,
  amenities: camper.amenities,
  coverImage: camper.gallery[0]?.thumb || null,
  totalReviews: camper.totalReviews,
});

const buildCampersFilter = (query = {}) => {
  const filter = {};

  if (query.location) {
    filter.location = { $regex: query.location.trim(), $options: 'i' };
  }

  if (query.form) {
    filter.form = query.form;
  }

  if (query.transmission) {
    filter.transmission = query.transmission;
  }

  if (query.engine) {
    filter.engine = query.engine;
  }

  return filter;
};

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getCampers = async (req, res, next) => {
  try {
    const page = Math.max(toPositiveInt(req.query.page, 1), 1);
    const perPage = Math.max(toPositiveInt(req.query.perPage, 4), 1);
    const filter = buildCampersFilter(req.query);

    const [campers, total] = await Promise.all([
      Camper.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage),
      Camper.countDocuments(filter),
    ]);

    res.json({
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
      campers: campers.map(toListItem),
    });
  } catch (error) {
    next(error);
  }
};

export const getCamperById = async (req, res, next) => {
  try {
    const camper = await Camper.findById(req.params.camperId);

    if (!camper) {
      throw createHttpError(404, 'Camper not found!');
    }

    const camperData = camper.toObject();
    const { _id, ...details } = camperData;

    res.json({
      id: _id.toString(),
      ...details,
    });
  } catch (error) {
    next(error);
  }
};

export const getCamperReviews = async (req, res, next) => {
  try {
    const camper = await Camper.findById(req.params.camperId);

    if (!camper) {
      throw createHttpError(404, 'Camper not found!');
    }

    const reviews = camper.reviews.map((review) => ({
      id: review._id.toString(),
      camperId: review.camperId,
      reviewer_name: review.reviewer_name,
      reviewer_rating: review.reviewer_rating,
      comment: review.comment,
      createdAt: review.createdAt,
    }));

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createBookingRequest = async (req, res, next) => {
  try {
    const camper = await Camper.findById(req.params.camperId).select('name');
    if (!camper) {
      throw createHttpError(404, 'Camper not found!');
    }
    const { name, email } = req.body;
    await BookingRequest.create({
      camperId: camper._id,
      name: name,
      email: email,
    });

    const templateSource = await fs.readFile(
      new URL('../templates/reset-password-email.html', import.meta.url),
      'utf8',
    );
    const template = handlebars.compile(templateSource);
    const html = template({ name });

    res.status(201).json({
      message: `Booking request for ${camper.name} accepted. We will contact you at ${email}.`,
    });

    sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      replyTo: process.env.SMTP_FROM,
      subject: 'Submit book',
      html,
    }).catch((error) => {
      console.error('Failed to send booking email:', error.message);
    });
  } catch (error) {
    next(error);
  }
};
