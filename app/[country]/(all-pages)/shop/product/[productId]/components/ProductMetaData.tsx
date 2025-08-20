import Head from "next/head";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { get_currency_key } from "@/lib/cookie/cookie.clients";

type ProductMetaProps = {
  product: NormalizedProductType;
};

const ProductMeta: React.FC<ProductMetaProps> = ({ product }) => {
  const title = product.name;

  // اختيار أفضل وصف متاح
  const description =
    (product.isOfferStillOn && product.offerSentence) ||
    product.shortDecription ||
    product.description ||
    "اكتشف هذا المنتج الرائع الآن في متجرنا.";

  const image = product.image || "/default-product.jpg";
  const price = product.priceAfterDiscount ?? product.price;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={product.tags.map(tag => tag.name).join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="og:site_name" content="اسم متجرك" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data JSON-LD للمنتج */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: title,
            image: [image],
            description: description,
            // sku: product.productNumber || undefined,
            // brand: {
            //   "@type": "Brand",
            //   name: product.brandName || "اسم المتجر",
            // },
            offers: {
              "@type": "Offer",
              url: typeof window !== "undefined" ? window.location.href : "",
              priceCurrency: get_currency_key(product.country),
              price: price,
              availability: product.isDisabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
            aggregateRating: product.numOfReviewers
              ? {
                  "@type": "AggregateRating",
                  ratingValue: product.rate,
                  reviewCount: product.numOfReviewers,
                }
              : undefined,
          }),
        }}
      />
    </Head>
  );
};

export default ProductMeta;
