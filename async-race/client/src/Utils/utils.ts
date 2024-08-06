export function getExistingElement<T extends HTMLElement>(
  selector: string,
  root: Document | HTMLElement = document,
): T {
  const element = root.querySelector<T>(selector);
  return element;
}

export function getExistingElements<T extends HTMLElement>(
  selector: string,
  root: Document | HTMLElement = document,
): T[] {
  const elements = root.querySelectorAll<T>(selector);
  return Array.from(elements);
}
