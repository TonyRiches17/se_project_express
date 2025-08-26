const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
