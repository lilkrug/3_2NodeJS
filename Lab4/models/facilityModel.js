class facilityModel {
  getFacility(conn) {
    return conn.facility.findMany();
  }

  getOneFacility(conn, facilityName) {
    return conn.facility.findMany({
      where: {
        facility_name: facilityName,
      },
    });
  }

  getOneFacilityById(conn, facilityId) {
    return conn.facility.findMany({
      where: {
        facility_id: facilityId,
      },
    });
  }

 async addFacility(conn, facilityObj) {
    let result = await conn.facility.create({
      data: {
        facility_id: facilityObj.facility_id,
        facility_name: facilityObj.facility_name,
        adress : facilityObj.adress,
        founding_date  : new Date(facilityObj.founding_date),
        sports_kind_id : facilityObj.sports_kind_id
      },
    });
    return result;
  }

  updateFacility(conn, facilityObj) {
    let result = conn.facility.update({
      data: {
        facility_id: facilityObj.facility_id,
        facility_name: facilityObj.facility_name,
        adress : facilityObj.adress,
        founding_date  : new Date(facilityObj.founding_date),
        sports_kind_id : facilityObj.sports_kind_id
      },
      where: { facility_id: facilityObj.facility_id },
    });
    return result;
  }

  deleteFacility(conn, facilityId) {
    let result = conn.facility.delete({ where: { facility_id: facilityId } });
    return result;
  }
}

module.exports = facilityModel;
