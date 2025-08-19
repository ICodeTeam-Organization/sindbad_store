export interface E_commerceCardProps {
    id: number;
    name: string;
    LinkOFStore: string;
    description?: string;
    logo: string;
    categories: string[];
    ecommerceStoreImages: StoreImage[];
}
export interface StoreImage {
    id: number;
    imageUrl: string;
}