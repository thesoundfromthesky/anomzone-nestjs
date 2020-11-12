function isUndefined(value: unknown): value is undefined {
  return value === undefined || value === null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value && typeof value === 'object' && value.constructor === Object;
}

export function isObjectEmpty(value: unknown) {
  return (
    isUndefined(value) || !isObject(value) || Object.keys(value).length < 1
  );
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}
