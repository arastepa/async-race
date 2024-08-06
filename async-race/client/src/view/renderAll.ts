import { store } from "../Store/store";
import { garageView } from "./garageView";
import { listenEvents } from "../Events/listenEvents";
import { listenPagination } from "../Pagination/Pagination";

export const renderAll = () => {
  const page: string = `
      <div class="container">
        <div class="buttons">
          <button class="garage">To Garage</button>
          <button class="winners">To Winners</button>
        </div>
        <div class="settings">
          <div class="create">
            <input type="text" class="createText"/>
            <input type="color" class="createColor" id="color" name="color" value="#ff0000"/>
            <input type="submit" class="createSubmit" class="btn" value="create" />
          </div>
          <div class="update">
            <input type="text" class="updateText" disabled />
            <input
              type="color"
              id="color"
              class="updateColor"
              name="color"
              value="#ff0000"
              disabled
            />
            <input type="submit" class="btn updateBtn" value="update" disabled />
          </div>
          <br />
          <div class="btns">
            <button class="race">RACE</button>
            <button class="reset" disabled>RESET</button>
            <button class="generate">GENERATE CARS</button>
          </div>
        </div>
        <h1 class="carCounts">Garage ${store.carCount}</h1>
        <h4 class="pageNum">page# ${store.pageNumber}</h4>
        <div class="allGarages">
          ${garageView()}
        </div>
      </div>
      <div class="modal hidden">
      </div>
      <div class="pagination">
        <button class="btn prev">PREV</button>
        <button class="btn next">NEXT</button>
      </div>
  `;
  append(page);
  if (document.querySelector(".errorContainer") === null) {
    listenEvents();
    listenPagination();
  }
};

const append = (page: string) => {
  if (document.querySelector(".errorContainer") === null) {
    const root = document.createElement("div");
    root.classList.add("root");
    root.innerHTML = page;
    document.body.innerHTML = "";
    document.body.append(root);
  }
};
