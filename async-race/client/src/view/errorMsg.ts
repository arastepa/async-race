export const appendMsg = (err: TypeError) => {
  document.body.innerHTML = "";
  const el = document.createElement("div");
  el.classList.add("errorContainer");
  el.innerHTML = `<h1>${err.message} possibly server is down, try to run server</h1>`;
  document.body.append(el);
};
