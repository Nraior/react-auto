import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";
import fetchCars from "./api/cars";
import { mockCarsData } from "./test-utils/test-data/cars-mock-data";
import fetchCarDetails from "./api/carDetails";
import { mockCarDetailData } from "./test-utils/test-data/car-detail-mock-data";

jest.mock(
  "./api/manufacturers",
  () =>
    new Promise((resolve) => {
      resolve({
        manufacturers: [{ name: "Dodge" }, { name: "Audi" }, { name: "BMW" }],
      });
    })
);
jest.mock("./api/colors", () => {
  return new Promise((resolve) => {
    resolve({
      colors: ["red", "blue", "green", "black", "yellow", "white", "silver"],
    });

    // test
  });
});

jest.mock("./api/cars", () => jest.fn());

jest.mock("./api/carDetails", () => jest.fn());

test("Navigation test", async () => {
  (fetchCars as jest.Mock).mockResolvedValue(mockCarsData);

  (fetchCarDetails as jest.Mock).mockResolvedValue(mockCarDetailData);

  await act(async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
  });

  const purchaseElement = await screen.findByText(/Purchase/i);
  const footerElement = await screen.findByText(/© AUTO1 Group 2018/i);
  const availableCars = await screen.findByText(/Available cars/i);

  expect(purchaseElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
  expect(availableCars).toBeInTheDocument();

  // Move to 404
  fireEvent.click(purchaseElement);

  const notFound = await screen.findByText(/404 - Not Found/i);
  expect(notFound).toBeInTheDocument();

  const backToHomepage = await screen.findByText(/homepage/i);
  expect(backToHomepage).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(backToHomepage);
  });

  const availableCarsBack = await screen.findByText(/Available cars/i);

  expect(availableCarsBack).toBeInTheDocument();

  const viewDetailItems = await screen.findAllByText(/View details/i);

  const firstCarButton = viewDetailItems[0];

  await act(async () => {
    fireEvent.click(firstCarButton);
  });
  const firstCar = mockCarsData.cars[0];
  const carName = await screen.findByText(
    `${firstCar.manufacturerName} ${firstCar.modelName}`
  );

  expect(carName).toBeInTheDocument();
});
