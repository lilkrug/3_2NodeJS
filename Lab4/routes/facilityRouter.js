const exp = require("express");

const facilityController = require("../controllers/facilityController");

const router = exp.Router();

router.get("/:name", facilityController.findFacility);
router.get("/", facilityController.getFacility);
router.post("/", facilityController.addFacility);
router.put("/", facilityController.setFacility);
router.delete("/:id", facilityController.deleteFacility);

module.exports = router;
