const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch("/me", updateProfile);

module.exports = router;
