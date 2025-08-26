const { celebrate, Joi } = require("celebrate");

const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().uri().required(),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
    }),
  }),
  createItem
);

router.delete(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteItem
);

router.put(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeItem
);

router.delete(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeItem
);

module.exports = router;
