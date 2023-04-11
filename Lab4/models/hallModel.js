class hallModel {
  async getHall(conn) {
    return  await conn.hall.findMany();
  }

  getOneHall(conn, hallid) {
    return conn.hall.findMany({
      where: {
        hall_id: parseInt(hallid),
      },
    });
  }

  getOneHallById(conn, hallId) {
    return conn.hall.findMany({
      where: {
        hall_id: hallId,
      },
    });
  }

  addHall(conn, hallObj) {
    let result = conn.hall.create({
      data: {
        hall_id:hallObj.hall_id,
        facility_id:hallObj.facility_id,
        trainer_id:hallObj.trainer_id,
        coating_type:hallObj.coating_type
               
      },
    });
    return result;
  }

  updateHall(conn, hallObj) {
    console.log("updateHall: " + JSON.stringify(hallObj));
    let result = conn.hall.update({
      data: {
        facility_id:hallObj.facility_id,
        trainer_id:hallObj.trainer_id,
        coating_type:hallObj.coating_type,
        facility:hallObj.facility
      },
      where: { hall_id: hallObj.hall_id },
    });
    return result;
  }

  deleteHall(conn, hallId) {
    console.log("deleteHall: " + JSON.stringify(hallId));
    let result = conn.hall.delete({ where: { hall_id: hallId } });
    return result;
  }
}

module.exports = hallModel;
