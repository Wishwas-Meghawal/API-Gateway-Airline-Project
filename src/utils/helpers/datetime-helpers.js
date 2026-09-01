function isDepartureTimeValid(departureTime, arrivalTime) {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  if (isNaN(departure) || isNaN(arrival)) {
    return false;
  }

  return departure < arrival;
}

module.exports = {
  isDepartureTimeValid,
};