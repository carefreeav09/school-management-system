const HttpError = require("../utils/HttpError");
const Students = require("../models/student-models");

const createStudent = async (studentInformation) => {
  const createdStudent = new Students(studentInformation);

  try {
    await createdStudent.save();
  } catch (err) {
    console.log("Something went wrong, please try again", 500);
  }

  return createdStudent;
};

module.exports = {
  createStudent
};
