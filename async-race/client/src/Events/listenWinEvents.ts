import { listenWinsPage } from "../Pagination/Pagination";
import { getWinners } from "../Requests/Services/getData";
import { store, wins } from "../Store/store";
import { getExistingElement } from "../Utils/utils";
import { insertBody } from "../view/Winnersview";
import { renderAll } from "../view/renderAll";
import { listenEvents } from "./listenEvents";

export const winEvents = async () => {
  const winnerBtn = getExistingElement<HTMLButtonElement>(`.winners`);

  winnerBtn.disabled = true;
  document
    .querySelector(".garage")
    .addEventListener("click", function (ev: Event) {
      ev.stopImmediatePropagation();
      renderAll();
      listenEvents();
    });
  const arr = await getWinners();
  wins.length = 0;
  wins.push(
    ...arr.map((winner) => ({
      finishedCar: {
        name: store.cars.find((car) => car.id === winner.id).name,
        color: store.cars.find((car) => car.id === winner.id).color,
        id: winner.id,
      },
      timeAnim: winner.time,
      winsCount: winner.wins,
    })),
  );
  insertBody();
  listenWinsPage();
};
