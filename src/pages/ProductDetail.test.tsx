import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router";
import fetchCars from "../api/cars";
import { mockCarsData } from "../test-utils/test-data/cars-mock-data";
import fetchCarDetails from "../api/carDetails";
import { mockCarDetailData } from "../test-utils/test-data/car-detail-mock-data";
import ProductDetail from "./ProductDetail";
jest.mock("../api/carDetails", () => jest.fn());

test("Favorites test", async () => {
  (fetchCarDetails as jest.Mock).mockResolvedValue(mockCarDetailData);

  await act(async () => {
    render(<ProductDetail />);
  });

  const carName = await screen.findByText(`Chrysler Saratoga`);
  expect(carName).toBeInTheDocument();
  const likeThisCarText = await screen.findByText(
    `If you like this car, click the button and save it in your collection of favourite items.`
  );

  expect(likeThisCarText).toBeInTheDocument();
  const saveButton = await screen.findByRole("button", { name: /Save/i });
  await fireEvent.click(saveButton);
  const dislikeThisCarText = await screen.findByText(
    `If you dislike this car, click the button and remove it from your favourite items collection.`
  );

  expect(dislikeThisCarText).toBeInTheDocument();
});
