export function isStringEmpty(s) {
  return s === null || s === undefined || s === "";
}

export function noop() {}

export const pointerCursorOnHoverStyle = {
  cursor: "pointer"
};

export function createListString(items, normalDelimiter, finalDelimiter) {
  if (items.length === 1) {
    return items[0];
  }
  const allButLastString = items.slice(0, -1).join(normalDelimiter);
  return `${allButLastString}${finalDelimiter}${items.slice(-1)[0]}`;
}
