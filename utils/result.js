const returnObject = (object) => {
  return object.toObject({
    getters: true,
  });
};

const returnArray = (array) => {
  return array.map((object) => returnObject(object));
};

module.exports = {
  returnObject,
  returnArray,
};
