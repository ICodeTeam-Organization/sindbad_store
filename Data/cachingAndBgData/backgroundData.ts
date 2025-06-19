import { BgHandlerDataItemType } from '@/lib/utils';
import { db } from '../database/db';

export const savebackgroundDataInCache = async (item: BgHandlerDataItemType) => { 
  const existingItem = await db.bgData
    .where('[reqType+Id]') 
    .equals([item.reqType, item.Id])
    .first();

  if (existingItem) {
    // إذا القيمة السابقة = القيمة الجديدة، نحذف العنصر (زي الكود القديم)
    if (existingItem.prevValue === item.reqValue) {
      await db.bgData
        .where('[reqType+Id]')
        .equals([item.reqType, item.Id])
        .delete();
    } else {
      // حدث العنصر مع تحديث الحقول المطلوبة
      await db.bgData.put({
        ...existingItem,
        reqValue: item.reqValue,
        reviewText: item.reviewText,
        prevValue: existingItem.prevValue,
        prevReviewText: existingItem.reviewText || null,
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
