const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getCurrentUser, updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().uri().required(),
    }),
  }),
  updateProfile
);

module.exports = router;
