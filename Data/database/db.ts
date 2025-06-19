import Dexie, { Table } from 'dexie';
import { NormalizedbgDataItemType, NormalizedCategoryType } from '../normalizTypes';
 

interface SindbadDBSchema {
  categories: Table<NormalizedCategoryType, number>;
  bgData: Table<NormalizedbgDataItemType, string>;
}

export const createDB = () => {
  const db = new Dexie('sindbadDB') as Dexie & SindbadDBSchema;

  db.version(1).stores({
    categories: 'id, name, categoryTypeName, categoryTypeNumber, parentCategoryId, code, path',
    bgData: 'Id, reqtype , date , [reqType+Id]',
  });

  return db;
};

export const db = createDB();


