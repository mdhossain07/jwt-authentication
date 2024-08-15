function exclude(obj) {
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "password") {
        delete obj[key];
      }
    }
  }

  return obj;
}

module.exports = exclude;
