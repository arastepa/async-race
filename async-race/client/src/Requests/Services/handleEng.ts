import { Engine } from "../../Types/type";
import { Drive } from "../../Types/type";

export const startEngine = async (id: string): Promise<Engine> => {
  try {
    const response: Engine = await (
      await fetch(`http://localhost:3000/engine?id=${id}&status=started`, {
        method: "PATCH",
      })
    ).json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const stopEngine = async (id: string): Promise<Engine> => {
  try {
    const response: Engine = await (
      await fetch(`http://localhost:3000/engine?id=${id}&status=stopped`, {
        method: "PATCH",
      })
    ).json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const drive = async (id: string): Promise<Drive> => {
  try {
    const response: Drive = await (
      await fetch(`http://localhost:3000/engine?id=${id}&status=drive`, {
        method: "PATCH",
      })
    ).json();
    return response;
  } catch (err) {
    return { success: false };
  }
};
