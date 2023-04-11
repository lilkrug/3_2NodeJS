const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const hallModel = require("../models/hallModel");
const hallFunc = new hallModel();

exports.getHall = (req, res) => {
  hallFunc.getHall(conn).then((result) => {
    res.render("Hall.hbs",{
      layout: false,
      hall: result,
    })
  });
};



exports.findHall = (req, res) => {
  let hallid = req.params["id"];
  hallFunc.getOneHall(conn, hallid).then((result) => {
    if (JSON.stringify(result) != "[]") {
      res.render("Hall.hbs",{
        layout: false,
        hall: result,
      })
      } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({ Error: `Hall with id ${hallid} not found` })
      );
    }
  });
};

exports.addHall = (req, res) => {
  let hallObj = req.body;
    hallFunc.getOneHall(conn, hallObj.hall_id).then((result) => {
    if (JSON.stringify(result) == "[]") {
      hallFunc
        .addHall(conn, hallObj)
        .then((result) => {
          res.redirect('/hall')
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
          Error: `Hall with id ${hallObj.hall_id} already exists!`,
        })
      );
    }
  });
};

exports.setHall = function (req, res) {
  let hallObj = req.body;
  console.log("Set Body: ", hallObj);
  let hallId = parseInt(req.body.hall_id);
  hallFunc.getOneHallById(conn, hallId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      hallFunc
        .updateHall(conn, hallObj)
        .then((result) => {
         
          res.redirect('/hall')
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
          Error: `Hall with Id ${hallId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteHall = function (req, res) {
  let hallId = parseInt(req.params["id"]);
  hallFunc.getOneHallById(conn, hallId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      hallFunc.deleteHall(conn, hallId).then((result) => {
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
          Error: `Hall with Id ${hallId} is not exists!`,
        })
      );
    }
  });
};
