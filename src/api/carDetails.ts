
const fetchCarDetails = async (stockNumber: string) => {

  try {

    const response = await fetch(
      `https://auto1-mock-server.vercel.app/api/cars/${stockNumber}`
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error while fetching car details data")
  }


  };
  
  export default fetchCarDetails;