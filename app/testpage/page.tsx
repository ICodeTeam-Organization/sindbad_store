import React from "react";  
import NewProductCarousel from "./components/NewproductsCarsoul";
import { NormalizedProductType } from "@/Data/normalizTypes";
function Test() {

  const dummyProducts: NormalizedProductType[] = [
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  },
  {
    id: 1,
    name: "بخور عود كمبودي فاخر",
    description: "بخور فاخر برائحة العود الطبيعي، جودة عالية تدوم طويلًا.",
    shortDecription: "عود كمبودي فاخر",
    price: 150,
    priceAfterDiscount: 120,
    priceBeforeDiscount: 150,
    hasDiscount: true,
    hasOffer: true,
    percentageOfDiscount: 20,
    amountYouBuy: 2,
    amountYouGet: 1,
    offerSentence: "اشترِ 2 واحصل على 1 مجانًا",
    offerStartDate: "2025-07-01",
    offerEndDate: "2025-07-20",
    oneStarCount: 1,
    twoStarCount: 0,
    threeStarCount: 3,
    fourStarCount: 7,
    fiveStarCount: 15,
    storeId: "s-101",
    storeName: "روائع العود",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // صورة عطر
    blurHash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "A001-KMB",
    rate: 4.7,
    tags: [{ id: 1, name: "فاخر" }, { id: 2, name: "جديد" }],
    quantity: 100,
    extraQuantity: 10,
    shipCost: 10,
    country: "اليمن",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 2,
    brandName: "كمبوديا",
    categoryName: "بخور",
    mainCategoriesIds: [1],
    subCategoriesIds: [11],
    mainCategoriesNames: ["بخور"],
    subCategoriesNames: ["عود كمبودي"],
    numOfReviewers: 26,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "كمبودي" },
      { attributeName: "الحجم", attributeValue: "100 جرام" }
    ]
  },
  {
    id: 2,
    name: "عطر شرقي ملكي",
    description: "عطر فاخر برائحة شرقية دافئة تناسب جميع الأوقات.",
    shortDecription: "عطر شرقي",
    price: 220,
    priceAfterDiscount: 200,
    priceBeforeDiscount: 220,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 9,
    amountYouBuy: 1,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "2025-06-20",
    offerEndDate: "2025-07-30",
    oneStarCount: 0,
    twoStarCount: 0,
    threeStarCount: 2,
    fourStarCount: 6,
    fiveStarCount: 20,
    storeId: "s-205",
    storeName: "عطور النخبة",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg", // عطر فاخر
    blurHash: "LQIh%5xt00ay_Nx^RjRj?bt7WBay",
    images: [
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg"
    ],
    productNumber: "P202-MAJ",
    rate: 4.9,
    tags: [{ id: 3, name: "عطر" }, { id: 4, name: "رجالي" }],
    quantity: 50,
    extraQuantity: 0,
    shipCost: 12,
    country: "السعودية",
    isDisabled: false,
    isOfferStillOn: true,
    brandId: 4,
    brandName: "النخبة",
    categoryName: "عطور",
    mainCategoriesIds: [2],
    subCategoriesIds: [21],
    mainCategoriesNames: ["عطور"],
    subCategoriesNames: ["عطور شرقية"],
    numOfReviewers: 28,
    attributesWithValues: [
      { attributeName: "النوع", attributeValue: "شرقي" },
      { attributeName: "الحجم", attributeValue: "50 مل" }
    ]
  }
];

  return (
    <div>
      <NewProductCarousel  products={dummyProducts}  sectionTitle="المنتجات الجديدة" sectionHref="/new-products" />
    </div>
  );
}

export default Test;
