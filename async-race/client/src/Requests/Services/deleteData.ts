export const deleteWinner = async (id: number): Promise<void> => {
  try {
    await fetch(`http://localhost:3000/winners/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  try {
    await fetch(`http://localhost:3000/garage/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};
