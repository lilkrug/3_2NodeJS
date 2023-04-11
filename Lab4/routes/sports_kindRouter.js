const exp = require("express");

const sports_kindController = require("../controllers/sports_kindController");

const router = exp.Router();

router.get("/", sports_kindController.getSports_kind);
router.get("/:name", sports_kindController.findSports_kind);
router.post("/", sports_kindController.addSports_kind);
router.put("/", sports_kindController.setSports_kind);
router.delete("/:id", sports_kindController.deleteSports_kind);

module.exports = router;
