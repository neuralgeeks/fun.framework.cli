module.exports = async () => {
  //------------------ Turn off services
  global.__SERVICESFORK__.kill();
};
