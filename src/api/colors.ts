const fetchColors = async () => {
  const response = await fetch("https://auto1-mock-server.vercel.app/api/colors");
  const data = await response.json();
  return data;
};

const colorsPromise = fetchColors();

export default colorsPromise;
