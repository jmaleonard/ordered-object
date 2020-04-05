export type OrderedObject = {
  [k: string]: any
  maxPropertyCount: number;
  indexedKeys: string[];
}

const filterKeyIsMaxPropertyCount = (key: string) => {
  return key !== "maxPropertyCount";
}

const filterKeyIsIndexKeys = (key: string) => {
  return key !== "indexedKeys";
}

export const updateObject = (sourceObject: OrderedObject, propertyKey: string, value: any) => {
  if (sourceObject.indexedKeys.length === 0) {
    sourceObject.indexedKeys = Object.keys(sourceObject).filter(filterKeyIsIndexKeys).filter(filterKeyIsMaxPropertyCount);
  }
  const index = sourceObject.indexedKeys;

  if (index.length >= sourceObject.maxPropertyCount) {
    const lastProperty = index.pop();
    if (lastProperty) {
      delete sourceObject[lastProperty];
    }
    index.unshift(propertyKey);
  } else {

    if (sourceObject.hasOwnProperty(propertyKey)) {
      const currentIndex = index.indexOf(propertyKey);
      const item = index.splice(currentIndex, 1)[0];
      index.unshift(item);
    } else if (!sourceObject.hasOwnProperty(propertyKey)) {
      sourceObject.indexedKeys.unshift(propertyKey)
    }
  }
  sourceObject[propertyKey] = value;
}

export const getKey = (sourceObject: OrderedObject, key: string) => {
  return sourceObject[key];
}


