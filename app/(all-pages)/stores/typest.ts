export interface StoreCardProps {
  id?: string;
  name: string;
  websiteLink: string;
  imagesUrl: string[];
  mainImageUrl: string;
  storeCategories?: string[];
}
export interface ApiResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: StoreData;
}

export interface StoreData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  storeCategoriesIds: StoreCategory[];
  images: StoreImage[];
  createdAt: string; // يمكنك استخدام Date إذا كنت تريد تحويلها
  updatedAt: string; // يمكنك استخدام Date إذا كنت تريد تحويلها
}

export interface StoreCategory {
  id: number;
  categoryName: string;
  categoryImageUrl: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  subCategoryName: string;
  subCategoryImageUrl: string; // تم تصحيح اسم الحقل من subCategoryImageUrle إلى subCategoryImageUrl
}

export interface StoreImage {
  id: number;
  imageUrl: string;
}