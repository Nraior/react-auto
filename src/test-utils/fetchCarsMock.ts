import { mockCarsData } from "./test-data/cars-mock-data";

export const mockFetchCars = (color: string, manufacturer: string, page: number) => {
    let filteredCars = mockCarsData.cars;


    // Apply filters if available
    if (color && color !== "All car colors") {
      filteredCars = filteredCars.filter(car => car.color === color);
    }

    if (manufacturer  && manufacturer !== "All manufacturers") {
      filteredCars = filteredCars.filter(car => car.manufacturerName === manufacturer);
    }

    const paginatedCars = filteredCars.slice((page - 1) * 10, page * 10); // Simulate pagination logic
    
    return {
      cars: paginatedCars,
      totalPageCount: Math.ceil(filteredCars.length / 10), // Assuming 10 items per page
      totalCarsCount: filteredCars.length,
    };
  };
