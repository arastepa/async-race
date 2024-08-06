import { winnersType } from "../../Types/type";

export const updateWinner = async (
  id: number,
  wins: number,
  time: number,
): Promise<winnersType> => {
  try {
    const body = { id, wins, time };
    const resp: winnersType = await (
      await fetch(`http://localhost:3000/winners/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export const updateSelected = async (
  id: number,
  name: string,
  colorName: string,
): Promise<void> => {
  try {
    const body = { name, color: colorName };
    await (
      await fetch(`http://localhost:3000/garage/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (err) {
    console.log(err);
  }
};
