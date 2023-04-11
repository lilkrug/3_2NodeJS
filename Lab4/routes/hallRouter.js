const exp = require("express");

const hallController = require("../controllers/hallController");

const router = exp.Router();

router.get("/", hallController.getHall);
router.get("/:id", hallController.findHall);
router.post("/", hallController.addHall);
router.put("/", hallController.setHall);
router.delete("/:id", hallController.deleteHall);

module.exports = router;
