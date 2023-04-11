class trainerModel {
  getTrainer(conn) {
    return conn.trainer.findMany();
  }

  getOneTrainer(conn, trainerName) {
    return conn.trainer.findMany({
      where: {
        trainer_name: trainerName,
      },
    });
  }

  getOneTrainerById(conn, trainerId) {
    return conn.trainer.findMany({
      where: {
        trainer_id: trainerId,
      }, 
    });
  }

 async addTrainer(conn, trainerObj) {
  console.log(`addTrainer: ${JSON.stringify(trainerObj)}`);
    let result = await conn.trainer.create({
      data: {
        trainer_id: trainerObj.trainer_id,
        trainer_name: trainerObj.trainer_name,
        experience: trainerObj.experience,
        category: trainerObj.category
      },
    });
    return result;
  }

  updateTrainer(conn, trainerObj) {
  console.log(`updateTrainer: ${JSON.stringify(trainerObj)}`);

    let result = conn.trainer.update({
      data: {
        trainer_name: trainerObj.trainer_name,
        experience: trainerObj.experience,
        category: trainerObj.category
      },
      where: { trainer_id: trainerObj.trainer_id },
    });
    return result;
  }

  deleteTrainer(conn, trainerId) {
    let result = conn.trainer.delete({ where: { trainer_id: trainerId } });
    return result;
  }
}

module.exports = trainerModel;
