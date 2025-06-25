import Dexie, { Table } from 'dexie';
import { NormalizedbgDataItemType, NormalizedCategoryType } from '../normalizTypes';
 

interface SindbadDBSchema {
  categories: Table<NormalizedCategoryType, number>;
  bgData: Table<NormalizedbgDataItemType, [number, number]>;
}

export const createDB = () => {
  const db = new Dexie('sindbadDB') as Dexie & SindbadDBSchema;

  db.version(2).stores({
    categories: 'id, name, categoryTypeName, categoryTypeNumber, parentCategoryId, code, path',
    bgData: '&[reqType+Id] , reqtype , date ',
  });

  return db;
};

export const db = createDB();


