const fetchManufacturers = async () => {
  const response = await fetch(
    "https://auto1-mock-server.vercel.app/api/manufacturers"
  );
  const data = await response.json();
  return data;
};

const manufacturersPromise = fetchManufacturers();

export default manufacturersPromise;
