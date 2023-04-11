const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const trainerModel = require("../models/trainerModel");
const trainerFunc = new trainerModel();

exports.getTrainer = (req, res) => {
  
  trainerFunc.getOneTrainer(conn).then((result) => {
 
  res.render("Trainer.hbs",{
    layout: false,
    trainer: result,
  })
});
};


 
exports.findTrainer = (req, res) => {
  let trainerName = req.params["name"];
  console.log(`findTrainer ${trainerName}`);
  trainerFunc.getOneTrainer(conn, trainerName).then((result) => {
    if (JSON.stringify(result) != "[]") {
     
  res.render("Trainer.hbs",{
    layout: false,
    trainer: result,
  })
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Trainer with name ${trainerName} not found`,
        })
      );
    }
  });
};

exports.addTrainer = (req, res) => {
  let trainerObj = req.body;
  trainerFunc
    .getOneTrainer(conn, trainerObj.trainer_name)
    .then((result) => {
      console.log(JSON.stringify(result));
      if (JSON.stringify(result) == "[]") {
        trainerFunc
          .addTrainer(conn, trainerObj)
          .then((result) => {
            res.redirect('/trainer')
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
            Error: `Trainer with name ${trainerObj.trainer_name} already exists!`,
          })
        );
      }
    });
};

exports.setTrainer = function (req, res) {
  let trainerObj = req.body;
  console.log("Body: ", trainerObj);
  let trainId = parseInt(req.body.trainer_id);
  trainerFunc.getOneTrainerById(conn, trainId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      trainerFunc
        .updateTrainer(conn, trainerObj)
        .then((result) => {
          res.redirect('/trainer')
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
          Error: `Trainer with Id ${trainId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteTrainer = function (req, res) {
  let trainId = parseInt(req.params["id"]);
  trainerFunc.getOneTrainerById(conn, trainId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      trainerFunc.deleteTrainer(conn, trainId).then((result) => {
      
        res.redirect('/trainer')
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({
          Error: `Trainer with Id ${trainId} is not exists!`,
        })
      );
    }
  });
};
