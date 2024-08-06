import { createCar } from "../Requests/Services/createData";
import { store } from "../Store/store";
import { CreateCar } from "../Types/type";
import { garageView } from "../view/garageView";
import { listenEvents } from "./listenEvents";
import { carNames } from "../Store/store";
import { getExistingElement } from "../Utils/utils";

export const randomColor = (): string => {
  const range: number = 16777215;
  const numSystem = 16;

  let randomColor = Math.floor(Math.random() * range).toString(numSystem);
  while (randomColor.length < 6) {
    randomColor = "0" + randomColor;
  }
  randomColor = "#" + randomColor;

  return randomColor;
};

export const randomCars = () => {
  const newCars: CreateCar[] = [];
  for (let i = 0; i < 100; i++) {
    newCars.push({
      name: generateCars(),
      color: randomColor(),
    });
  }
  return newCars;
};

export const generateCars = () => {
  const carIndex = Math.floor(Math.random() * 100);
  return carNames[carIndex];
};

export const addCarToStore = async (car: CreateCar) => {
  const newCar = await createCar(car);
  store.carCount += 1;
  store.cars.push(newCar);
};

export const generateAndAddCars = async () => {
  const cars = randomCars();
  for (const car of cars) {
    await addCarToStore(car);
  }
};

export const renderGarage = () => {
  const garage = getExistingElement<HTMLInputElement>(`.allGarages`);
  garage.innerHTML = garageView();
};

export const updateCarCount = () => {
  const carCounts = getExistingElement<HTMLElement>(`.carCounts`);
  carCounts.innerText = `Garage ${store.carCount}`;
};

export const generate = async (ev: Event) => {
  try {
    ev.stopImmediatePropagation();
    await generateAndAddCars();
    renderGarage();
    updateCarCount();
    listenEvents();
  } catch (err) {
    console.log(err);
  }
};
