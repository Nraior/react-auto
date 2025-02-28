import CarInterface from "./CarInterface"

interface AvailableCarsInterface {
    cars: CarInterface[],
    totalCarsCount: number,
    totalPageCount: number,
}

export default AvailableCarsInterface