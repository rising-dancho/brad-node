function createRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function converToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

module.exports = {
  createRandomNumber,
  converToFahrenheit,
};
