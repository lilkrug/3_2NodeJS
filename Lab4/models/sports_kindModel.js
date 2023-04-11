class sports_kindModel {
  getSports_kind(conn) {
    return conn.sports_kind.findMany();
  }

  getOneSports_kind(conn, sports_kindName) {
    return conn.sports_kind.findMany({
      where: {
        sports_kind_name: sports_kindName,
      },
    });
  }

  getOneSports_kindById(conn, sports_kindId) {
    return conn.sports_kind.findMany({
      where: {
        sports_kind_id: sports_kindId,
      },
    });
    
  }

  async addSports_kind(conn, sports_kindObj) {
    console.log(`: addSports_kind ${JSON.stringify(sports_kindObj)}`);
    let result = await conn.sports_kind.create({
      data: {
        sports_kind_id: sports_kindObj.sports_kind_id,
        sports_kind_name: sports_kindObj.sports_kind_name
      },
    });
    return result;
  }

  updateSports_kind(conn, sports_kindObj) {
    let result = conn.sports_kind.update({
      data: {
        sports_kind_name: sports_kindObj.sports_kind_name
      },
      where: { sports_kind_id: sports_kindObj.sports_kind_id },
    });
    return result;
  }

  deleteSports_kind(conn, sports_kindId) {
    let result = conn.sports_kind.delete({ where: { sports_kind_id: sports_kindId } });
    return result;
  }
}

module.exports = sports_kindModel;
