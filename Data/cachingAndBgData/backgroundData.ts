import { db } from "../database/db";
import { BgHandlerDataItemType } from "./type";

export const savebackgroundDataInCache = async (
  item: BgHandlerDataItemType
) => {
  const existingItem = await db.bgData
    .where("[reqType+Id]")
    .equals([item.reqType, item.Id])
    .first();

  if (existingItem) {
    // إذا القيمة السابقة = القيمة الجديدة، نحذف العنصر (زي الكود القديم)
    if (existingItem.primaryValue == item.reqValue) {
      await db.bgData
        .where("[reqType+Id]")
        .equals([item.reqType, item.Id])
        .delete();
    } else {
      // حدث العنصر مع تحديث الحقول المطلوبة
      await db.bgData.put({
        ...existingItem,
        reqValue: item.reqValue,
        reviewText: item.reviewText,
        primaryValue: existingItem.primaryValue,
        primaryReviewText: existingItem.primaryReviewText,
        date: new Date().toISOString(),
      });
    }
  } else {
    // أضف العنصر إذا مش موجود
    await db.bgData.add({
      ...item,
      date: new Date().toISOString(),
      
    });
  }
};

export const getbackgroundData = async (type?: number) => {
  try {
    if (type) {
      const data = await db.bgData.where("reqType").equals(type).toArray();
      return data;
    } else {
      const data = await db.bgData.toArray();
      return data;
    }
  } catch (error) { 
    throw error;
  }
};
