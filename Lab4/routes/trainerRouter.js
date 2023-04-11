const exp = require("express");

const trainerController = require("../controllers/trainerController");

const router = exp.Router();

router.get("/:name", trainerController.findTrainer);
router.get("/", trainerController.getTrainer);
router.post("/", trainerController.addTrainer);
router.put("/", trainerController.setTrainer);
router.delete("/:id", trainerController.deleteTrainer);

module.exports = router;
