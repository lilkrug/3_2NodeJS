const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const sports_kindModel = require("../models/sports_kindModel");
const sports_kindFunc = new sports_kindModel();

exports.getSports_kind = (req, res) => {
  sports_kindFunc.getSports_kind(conn).then((result) => {
    res.render("Sports_kind.hbs",{
      layout: false,
      sports_kind: result,
    })
  });
};


exports.findSports_kind = (req, res) => {
  let kindName = req.params["name"];
  sports_kindFunc.getOneSports_kind(conn, kindName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      res.render("Sports_kind.hbs",{
        layout: false,
        sports_kind: result,
      })
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({ Error: `Sports_kind with name ${kindName} not found` })
      );
    }
  });
};

exports.addSports_kind = (req, res) => {
  let sports_kindObj = req.body;
  sports_kindFunc.getOneSports_kind(conn, sports_kindObj.sports_kind_name)
  .then((result) => {
    console.log(JSON.stringify(result));
    if (JSON.stringify(result) == "[]") {
      sports_kindFunc
        .addSports_kind(conn, sports_kindObj)
        .then((result) => {
          res.redirect('/sports_kind')
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
          Error: `Sports_kind with name ${sports_kindObj.sports_kind_name} already exists!`,
        })
      );
    }
  });
};

exports.setSports_kind = function (req, res) {
  let sports_kindObj = req.body;
  let kindId = parseInt(req.body.sports_kind_id);
  sports_kindFunc.getOneSports_kindById(conn, kindId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      sports_kindFunc
        .updateSports_kind(conn, sports_kindObj)
        .then((result) => {
          res.redirect('/sports_kind')
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
          Error: `Sports_kind with Id ${kindId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteSports_kind = function (req, res) {
  let kindId = parseInt(req.params["id"]);
  sports_kindFunc.getOneSports_kindById(conn, kindId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      sports_kindFunc.deleteSports_kind(conn, kindId).then((result) => {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(result));
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Sports_kind with Id ${kindId} is not exists!`,
        })
      );
    }
  });
};
