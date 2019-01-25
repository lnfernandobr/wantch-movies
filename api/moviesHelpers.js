const IMG_BASE_URL = "https://image.tmdb.org/t/p/w300";
const IMG_BASE_POSTER = "https://image.tmdb.org/t/p/original";

export const getImage = (path, type) => {
  return type === "poster"
    ? path
      ? `${IMG_BASE_POSTER}${path}`
      : "noimage.jpeg"
    : path
      ? `${IMG_BASE_URL}${path}`
      : "noimage.jpeg";
};

export const numberToDolar = number => {
  const newNumber = number.toFixed(2).split(".");
  newNumber[0] = "R$ " + newNumber[0].split(/(?=(?:...)*$)/).join(".");
  return newNumber.join(",");
};
