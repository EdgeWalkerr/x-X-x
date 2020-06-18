interface obj {
  [key: string]: string | number | Date | obj;
}

const a = {
  a: 'asdf',
  b: 'daf',
  e: new Date(),
  c: {
    a: 133,
    f: new Date(),
  },
} as const;

type b<T extends obj> = {
  [key in keyof T]: T[key] extends Date
    ? string
    : T[key] extends obj
    ? b<T[key]>
    : T[key];
};
const isOfType = function <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T {
  return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
}


type c = b<typeof a>;
function func<T extends obj>(a: T): b<T> {
  const result = {};
  Object.keys(a).forEach((key) => {
    switch (true) {
      case typeof a[key] === 'string':
      case typeof a[key] === 'number':
        result[key] = a[key];
        break;

      case isOfType<Date>(a, key as any):
        result[]

    }
  })
  return {} as any;
}

const e = func(a as typeof a);
