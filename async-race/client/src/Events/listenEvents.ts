import { deleteCar, deleteWinner } from "../Requests/Services/deleteData";
import { drive, startEngine, stopEngine } from "../Requests/Services/handleEng";
import { updateSelected, updateWinner } from "../Requests/Services/updateData";
import { createCar, createWinner } from "../Requests/Services/createData";
import { animArr, finished, firstFinished, wins } from "../Store/store";
import { store } from "../Store/store";
import { getExistingElement } from "../Utils/utils";
import { getExistingElements } from "../Utils/utils";
import { winnerspag } from "../view/Winnersview";
import { allAnimationsStopped } from "./checkAnim";
import { generate } from "./genCars";
import { winEvents } from "./listenWinEvents";
import { updateGarage } from "../view/updateGarage";

async function checkAllAnimations() {
  if (allAnimationsStopped()) {
    if (finished.length === 0) {
      return;
    }
    const { finishedCar, timeAnim } = firstFinished;
    const found = wins.find((el) => el.finishedCar.id === finishedCar.id);
    if (found) {
      found.winsCount++;
      if (found.timeAnim > timeAnim) found.timeAnim = timeAnim;
      await updateWinner(found.finishedCar.id, found.winsCount, found.timeAnim);
    } else {
      const winsCount = 1;
      wins.push({ finishedCar, timeAnim, winsCount });
      await createWinner({ finishedCar, timeAnim, winsCount });
    }
    const div = document.querySelector(".modal");
    if (div) {
      div.innerHTML = `<h1>winner: <br> ${finishedCar.name} Time: ${found ? found.timeAnim.toFixed(3) : timeAnim.toFixed(3)}s <br> <button class="closeBtn">OK</button></h1>`;
      div.classList.remove("hidden");
    }
    document
      .querySelector(".closeBtn")
      .addEventListener("click", function (this: HTMLElement, ev) {
        ev.stopImmediatePropagation();
        const div = document.querySelector(".modal");
        div.classList.add("hidden");
      });
  }
}

const startCar = async (
  car: HTMLElement,
  start: number,
  finish: number,
  carId: string,
  checkEl: number,
) => {
  try {
    const { velocity, distance } = await startEngine(carId);
    const time = distance / velocity;
    const animation: Animation = car.animate(
      [{ marginLeft: `${start}px` }, { marginLeft: `${finish}px` }],
      {
        duration: time,
        fill: "forwards",
      },
    );
    const id = carId;
    animArr.push({ animation, id });
    animation.onfinish = () => {
      const timeAnim = time / 1000;
      const details = store.cars.find((car) => car.id === +carId);
      if (details !== undefined) {
        const { name, color, id } = details;
        const finishedCar = { name, color, id };
        if (finished.length === 0) {
          firstFinished.finishedCar = finishedCar;
          firstFinished.timeAnim = timeAnim;
        }
        finished.push({ finishedCar, timeAnim });
        if (checkEl === 1) checkAllAnimations();
      }
    };
    const { success } = await drive(id);
    if (!success) {
      animation.pause();
      if (checkEl === 1) checkAllAnimations();
      await stopEngine(id);
    }
  } catch (err) {
    console.log(err);
  }
};

async function startEvnt(this: HTMLInputElement, ev: Event) {
  ev.stopImmediatePropagation();
  this.disabled = true;
  const car = getExistingElement<HTMLElement>(`.car-${this.id}`);
  const flag = getExistingElement<HTMLElement>(".finish");
  const stop = getExistingElement<HTMLInputElement>(`.stop-${this.id}`);
  stop.disabled = false;
  const start = car.offsetLeft;
  const finish = flag.offsetLeft + 30;
  const checkEl = 0;
  startCar(car, start, finish, this.id, checkEl);
}

const startRace = (id: number, checkEl: number) => {
  const car = getExistingElement<HTMLElement>(`.car-${id}`);
  const flag = getExistingElement<HTMLElement>(".finish");
  const start = car.offsetLeft;
  const finish = flag.offsetLeft + 30;
  startCar(car, start, finish, id.toString(), checkEl);
};

async function stopEvnt(this: HTMLInputElement, ev: Event) {
  try {
    ev.stopImmediatePropagation();
    const car = getExistingElement<HTMLElement>(`.car-${this.id}`);
    const startBtn = getExistingElement<HTMLInputElement>(`.start-${this.id}`);
    const anim = animArr.find((anim) => anim.id === this.id);

    const initialPosition = 8;
    anim.animation.cancel();
    car.style.marginLeft = `${initialPosition}px`;
    const index = animArr.findIndex((a) => a.id === this.id);
    if (index !== -1) {
      animArr.splice(index, 1);
    }
    this.disabled = true;
    startBtn.disabled = false;
  } catch (err) {
    console.log(err);
  }
}

function updateCar(this: HTMLElement, ev: Event) {
  ev.stopImmediatePropagation();
  const textInput = getExistingElement<HTMLInputElement>(`.updateText`);
  const color = getExistingElement<HTMLInputElement>(`.updateColor`);
  const update = getExistingElement<HTMLInputElement>(`.updateBtn`);
  const garage = getExistingElement<HTMLInputElement>(`.allGarages`);
  const rm = getExistingElement<HTMLInputElement>(`.remove-${this.id}`);

  rm.disabled = true;
  textInput.disabled = false;
  color.disabled = false;
  update.disabled = false;

  let name: string;
  let colorName: string;
  garage.id = this.id;
  textInput.addEventListener("input", function (ev) {
    ev.stopImmediatePropagation();
    name = this.value;
  });
  color.addEventListener("change", function (ev) {
    ev.stopImmediatePropagation();
    colorName = this.value;
  });
  update.addEventListener("click", async function (this: HTMLElement, ev) {
    try {
      const rm = getExistingElement<HTMLInputElement>(`.remove-${garage.id}`);
      rm.disabled = false;
      const carId = garage.id;
      ev.stopImmediatePropagation();
      const selected = store.cars.find((car) => car.id === +carId);
      if (colorName !== undefined) selected.color = colorName;
      else colorName = selected.color;
      if (name !== undefined) selected.name = name;
      else name = selected.name;
      await updateSelected(+carId, name, colorName);
      textInput.disabled = true;
      color.disabled = true;
      update.disabled = true;
      updateGarage();
      listenEvents();
    } catch (err) {
      console.log(err);
    }
  });
}

function createNewCar() {
  const textInput = getExistingElement<HTMLInputElement>(`.createText`);
  const colorName = getExistingElement<HTMLInputElement>(`.createColor`);
  const submit = getExistingElement<HTMLInputElement>(`.createSubmit`);
  const carCounts = getExistingElement<HTMLElement>(`.carCounts`);

  let name: string;
  let color: string;
  textInput.addEventListener("input", function (ev) {
    ev.stopImmediatePropagation();
    name = this.value;
  });
  colorName.addEventListener("change", function (ev) {
    ev.stopImmediatePropagation();
    color = this.value;
  });
  submit.addEventListener("click", async function (ev) {
    try {
      ev.stopImmediatePropagation();
      if (name !== undefined && color !== undefined) {
        const newCar = await createCar({ name, color });
        store.carCount += 1;
        store.cars.push(newCar);
        updateGarage();
        carCounts.innerText = `Garage ${store.carCount}`;
        listenEvents();
      }
    } catch (err) {
      console.log(err);
    }
  });
}

async function removeCar(this: HTMLElement, ev: Event) {
  try {
    ev.stopImmediatePropagation();
    const carCounts = getExistingElement<HTMLElement>(`.carCounts`);
    const foundIndex = wins.findIndex((win) => win.finishedCar.id === +this.id);
    await deleteWinner(+this.id);
    if (foundIndex !== -1) {
      wins.splice(foundIndex, 1);
    }
    const finIndex = finished.findIndex(
      (finsih) => finsih.finishedCar.id === +this.id,
    );
    if (finIndex !== -1) {
      finished.splice(finIndex, 1);
    }
    await deleteCar(+this.id);
    store.carCount -= 1;
    store.cars = store.cars.filter((car) => car.id !== +this.id);
    updateGarage();
    carCounts.innerText = `Garage ${store.carCount}`;
    listenEvents();
  } catch (err) {
    console.log(err);
  }
}

export const listenEvents = () => {
  const garage = getExistingElement<HTMLButtonElement>(`.garage`);

  document.querySelectorAll(".startFirst").forEach((btn) => {
    btn.addEventListener("click", startEvnt);
  });
  document.querySelectorAll(".stopSecond").forEach((btn) => {
    btn.addEventListener("click", stopEvnt);
  });
  document.querySelectorAll(".select").forEach((btn) => {
    btn.addEventListener("click", updateCar);
  });
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", removeCar);
  });
  document
    .querySelector(".race")
    .addEventListener("click", function (this: HTMLButtonElement, ev) {
      ev.stopImmediatePropagation();
      finished.length = 0;
      console.log("RACE");
      const reset = getExistingElement<HTMLInputElement>(`.reset`);
      reset.disabled = false;
      this.disabled = true;
      const startIndex = (store.pageNumber - 1) * store.items;
      const endIndex = startIndex + store.items;
      const flag = 1;
      return store.cars.slice(startIndex, endIndex).map((car) => {
        startRace(car.id, flag);
      });
    });
  document
    .querySelector(".reset")
    .addEventListener("click", function (this: HTMLButtonElement, ev) {
      ev.stopImmediatePropagation();
      finished.length = 0;
      firstFinished.finishedCar = null;
      firstFinished.timeAnim = null;
      const race = getExistingElement<HTMLInputElement>(`.race`);
      const cars: HTMLElement[] = getExistingElements<HTMLElement>(`.car`);

      animArr.forEach((anim) => anim.animation.cancel());
      this.disabled = true;
      race.disabled = false;
      const initialPosition = 8;
      animArr.length = 0;
      cars.forEach((car) => (car.style.marginLeft = `${initialPosition}px`));
    });
  document
    .querySelector(".winners")
    .addEventListener("click", function (ev: Event) {
      ev.stopImmediatePropagation();
      winnerspag();
      winEvents();
    });
  garage.disabled = true;
  document.querySelector(".generate").addEventListener("click", generate);
  createNewCar();
};
