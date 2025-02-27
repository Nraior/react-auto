import { act, fireEvent, render, screen } from "@testing-library/react";
import Main from "./Main";
import { MemoryRouter } from "react-router";
import fetchCars from "../api/cars";
import { mockCarsData } from "../test-utils/test-data/cars-mock-data";
import { mockFetchCars } from "../test-utils/fetchCarsMock";

jest.mock(
  "../api/manufacturers",
  () =>
    new Promise((resolve) => {
      resolve({
        manufacturers: [
          { name: "Dodge" },
          { name: "Volkswagen" },
          { name: "BMW" },
        ],
      });
    })
);
jest.mock("../api/colors", () => {
  return new Promise((resolve) => {
    resolve({
      colors: ["red", "blue", "green", "black", "yellow", "white", "silver"],
    });

    // test
  });
});

jest.mock("../api/cars", () => jest.fn());

jest.mock("../api/carDetails", () => jest.fn());

test("Main Page Test", async () => {
  // Mock the fetchCars API to return a Promise that resolves to data
  (fetchCars as jest.Mock).mockImplementation((color, manufacturer, page) => {
    return Promise.resolve(mockFetchCars(color, manufacturer, page)); // Return a resolved promise
  });

  await act(async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Main />
      </MemoryRouter>
    );
  });

  const showingResults = await screen.findByText("Showing 10 of 20 results");
  expect(showingResults).toBeInTheDocument();

  //Check first car
  const firstCar = mockCarsData.cars[0];
  const firstCarStockText = await screen.findByText(
    `Stock # ${firstCar.stockNumber} - ${firstCar.mileage.number} ${firstCar.mileage.unit} - ${firstCar.fuelType} - ${firstCar.color}`
  );
  await expect(firstCarStockText).toBeInTheDocument();

  const pageResults = await screen.findByText("Page 1 of 2");
  expect(pageResults).toBeInTheDocument();

  const PaginationFirstButton = await screen.findByText("First");
  expect(PaginationFirstButton).toBeDisabled();
  const PaginationPreviousButton = await screen.findByText("Previous");
  expect(PaginationPreviousButton).toBeDisabled();
  const PaginationNextButton = await screen.findByText("Next");
  expect(PaginationNextButton).toBeEnabled();
  const PaginationLastButton = await screen.findByText("Last");
  expect(PaginationLastButton).toBeEnabled();

  await act(async () => {
    fireEvent.click(PaginationNextButton);
  });

  const nextPageFirstCar = mockCarsData.cars[10];
  const nextPageFirstCarStockText = await screen.findByText(
    `Stock # ${nextPageFirstCar.stockNumber} - ${nextPageFirstCar.mileage.number} ${nextPageFirstCar.mileage.unit} - ${nextPageFirstCar.fuelType} - ${nextPageFirstCar.color}`
  );

  await expect(nextPageFirstCarStockText).toBeInTheDocument();
  expect(PaginationFirstButton).toBeEnabled();
  expect(PaginationPreviousButton).toBeEnabled();
  expect(PaginationNextButton).toBeDisabled();
  expect(PaginationLastButton).toBeDisabled();
  const nextPageResultText = await screen.findByText("Page 2 of 2");
  expect(nextPageResultText).toBeInTheDocument();

  // Test Dropdown
});

test("Filter by color and manufacturer and check applied results", async () => {
  // Mock API call for fetching filtered data
  (fetchCars as jest.Mock).mockImplementation((color, manufacturer, page) => {
    return Promise.resolve(mockFetchCars(color, manufacturer, page)); // Return a resolved promise
  });
  // Render your component

  await act(async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Main />
      </MemoryRouter>
    );
  });

  // Color dropdown
  const colorDropdown = await screen.findByLabelText("Color");
  await fireEvent.mouseDown(colorDropdown);
  const redOption = await screen.findByText("red"); // Find the "Blue" option
  fireEvent.click(redOption); // Click on the "Blue" option
  expect(colorDropdown).toHaveTextContent("red");

  //  Manufacturer dropdown
  const manufacturerDropdown = await screen.findByLabelText("Manufacturer");
  await fireEvent.mouseDown(manufacturerDropdown);
  const VolkswagenOption = await screen.findByText("Volkswagen"); // Find the "Blue" option
  fireEvent.click(VolkswagenOption); // Click on the "Blue" option
  expect(manufacturerDropdown).toHaveTextContent("Volkswagen");

  // Click filter button

  const filterButton = await screen.findByRole("button", { name: /filter/i });
  await act(async () => {
    await fireEvent.click(filterButton);
  });

  const resultWithNoFoundItems = await screen.findByText(
    "Showing 1 of 1 results"
  );
  expect(resultWithNoFoundItems).toBeInTheDocument();
  const doesntShowPage = screen.queryByText("Page 1 of 1");
  expect(doesntShowPage).toBeNull();
});
