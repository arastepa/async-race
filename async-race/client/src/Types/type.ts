export interface Cars {
  name: string;
  color: string;
  id: number;
}

export interface CreateCar {
  name: string;
  color: string;
}

export interface Store {
  cars: Cars[];
  carCount: number;
  pageNumber: number;
  items: number;
}

export interface Finished {
  finishedCar: Cars;
  timeAnim: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Drive {
  success: boolean;
}

export interface Anim {
  animation: Animation;
  id: string;
}

export interface Winners {
  pageNumber: number;
  items: number;
}

export interface Won {
  finishedCar: Cars;
  timeAnim: number;
  winsCount: number;
}

export interface winnersType {
  id: number;
  wins: number;
  time: number;
}
