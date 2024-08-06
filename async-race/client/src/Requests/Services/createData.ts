import { Cars, CreateCar, Won } from "../../Types/type";

export const createCar = async (body: CreateCar): Promise<Cars> => {
  try {
    const response: Cars = await (
      await fetch(`http://localhost:3000/garage/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const createWinner = async (data: Won): Promise<void> => {
  try {
    const body = {
      id: data.finishedCar.id,
      wins: data.winsCount,
      time: data.timeAnim,
    };
    await fetch(`http://localhost:3000/winners/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
