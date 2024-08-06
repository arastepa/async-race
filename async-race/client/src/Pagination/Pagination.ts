import { store, winners, wins } from "../Store/store";
import { listenEvents } from "../Events/listenEvents";
import { garageView } from "../view/garageView";
import { winEvents } from "../Events/listenWinEvents";
import { getExistingElement } from "../Utils/utils";
import { insertBody } from "../view/Winnersview";

export const listenPagination = () => {
  const pageNum = getExistingElement<HTMLElement>(`.pageNum`);
  document.querySelector(".next").addEventListener("click", function () {
    const garage = getExistingElement<HTMLInputElement>(`.allGarages`);

    const totalPages = Math.ceil(store.cars.length / store.items);
    if (store.pageNumber < totalPages) {
      store.pageNumber += 1;
      garage.innerHTML = garageView();
      pageNum.innerText = `page# ${store.pageNumber}`;
      listenEvents();
    }
  });
  document.querySelector(".prev").addEventListener("click", function () {
    const garage = getExistingElement<HTMLInputElement>(`.allGarages`);
    if (store.pageNumber > 1) {
      store.pageNumber -= 1;
      garage.innerHTML = garageView();
      pageNum.innerText = `page# ${store.pageNumber}`;
      listenEvents();
    }
  });
};

export const listenWinsPage = () => {
  document
    .querySelector(".next")
    .addEventListener("click", function (ev: Event) {
      ev.stopImmediatePropagation();
      const totalPages = Math.ceil(wins.length / winners.items);
      if (winners.pageNumber < totalPages) {
        winners.pageNumber += 1;
        insertBody();
        winEvents();
      }
    });
  document
    .querySelector(".prev")
    .addEventListener("click", function (ev: Event) {
      ev.stopImmediatePropagation();
      if (winners.pageNumber > 1) {
        winners.pageNumber -= 1;
        insertBody();
        winEvents();
      }
    });
};
