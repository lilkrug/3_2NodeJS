const {
  PrismaClient
} = require("@prisma/client");
const {
  json
} = require("express");
const conn = new PrismaClient();

const facilityModel = require("../models/facilityModel");
const facilityFunc = new facilityModel();

exports.getFacility = (req, res) => {

  facilityFunc.getOneFacility(conn).then((result) => {

    res.render("Facility.hbs", {
      layout: false,
      facility: result,
    })
  });
};



exports.findFacility = (req, res) => {
  let facilityName = req.params["name"];
  console.log(`findFacility ${facilityName}`);
  facilityFunc.getOneFacility(conn, facilityName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      res.render("Facility.hbs", {
        layout: false,
        facility: result,
      })
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Facility with name ${facilityName} not found`,
        })
      );
    }
  });
};

exports.addFacility = (req, res) => {
  let facilityObj = req.body;
  console.log("Body: ", facilityObj);
  facilityFunc
    .getOneFacility(conn, facilityObj.facility_name)
    .then((result) => {
      console.log("!!! --- addFacility:");
      console.log(JSON.stringify(result));
      if (JSON.stringify(result) == "[]") {
        facilityFunc
          .addFacility(conn, facilityObj)
          .then((result) => {
            res.redirect('/facility')
          })
          .catch((e) => {
            console.log("Error: ", e);
            res.end(JSON.stringify(e));
          });
      } else {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            Error: `Facility with name ${facilityObj.facility_name} already exists!`,
          })
        );
      }
    });
};

exports.setFacility = function (req, res) {
  let facilityObj = req.body;
  console.log("Body: ", facilityObj);
  let trainId = parseInt(req.body.facility_id);
  facilityFunc.getOneFacilityById(conn, trainId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      facilityFunc
        .updateFacility(conn, facilityObj)
        .then((result) => {
          res.redirect('/facility')
        })
        .catch((e) => {
          console.log("Error: ", e);
          res.end(JSON.stringify(e));
        });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Facility with Id ${trainId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteFacility = function (req, res) {
  let trainId = parseInt(req.params["id"]);
  facilityFunc.getOneFacilityById(conn, trainId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      facilityFunc.deleteFacility(conn, trainId).then((result) => {
      res.redirect('/trainer')
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Facility with Id ${trainId} is not exists!`,
        })
      );
    }
  });
};