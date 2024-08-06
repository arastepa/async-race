import { Cars, winnersType } from "../../Types/type";
import { store } from "../../Store/store";
import { appendMsg } from "../../view/errorMsg";

export const getCars = async (): Promise<Cars[]> => {
  try {
    const response: Response = await fetch("http://localhost:3000/garage");
    const data: Cars[] = await response.json();
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      appendMsg(err);
    }
    console.log(err);
  }
};

export const getData = async (): Promise<void> => {
  try {
    const cars = await getCars();
    store.cars = cars;
    store.carCount = cars ? cars.length : 0;
  } catch (err) {
    console.log(err);
  }
};

export const getWinners = async (): Promise<winnersType[]> => {
  try {
    const response: winnersType[] = await (
      await fetch("http://localhost:3000/winners")
    ).json();
    return response;
  } catch (err) {
    console.log(err);
  }
};
