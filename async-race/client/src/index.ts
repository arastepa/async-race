import { renderAll } from "./view/renderAll";
import "./styles/style.css";
import { getData } from "./Requests/Services/getData";

export const renderPage = async () => {
  await getData();
  renderAll();
};

renderPage();
