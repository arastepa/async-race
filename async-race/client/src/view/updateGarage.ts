import { getExistingElement } from "../Utils/utils";
import { garageView } from "./garageView";

export const updateGarage = () => {
  const garage = getExistingElement<HTMLInputElement>(`.allGarages`);
  garage.innerHTML = garageView();
};
