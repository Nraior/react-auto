const fetchCars = async (color: string, manufacturer: string, page = 1) => {
  const fullLink = `https://auto1-mock-server.vercel.app/api/cars?${
    manufacturer !== "All manufacturers" ? `manufacturer=${manufacturer}&` : ""
  }${color !== "All car colors" ? `color=${color}&` : ""}sort=asc&page=${page}`;

  const response = await fetch(fullLink);
  const data = await response.json();
  return data;
};

export default fetchCars;
