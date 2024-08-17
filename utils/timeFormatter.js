const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

class TimeFormatter {
  accessTokenExpiration = (time) => {
    return dayjs.duration(time.split("m")[0], "minutes").asSeconds();
  };

  refreshTokenExpiration = (time) => {
    return dayjs.duration(time.split("d")[0], "days").asSeconds();
  };
}

module.exports = new TimeFormatter();
