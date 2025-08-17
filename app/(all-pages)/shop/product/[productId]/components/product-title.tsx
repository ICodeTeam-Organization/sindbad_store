import { ProductDetailsProps } from '../types';


const ProductTitle = ({name, description }: Pick<ProductDetailsProps, 'name' | 'description' | 'rating'>) => {
    return (
      <div className="mb-4 my-6">
        {/* <div className="flex gap-1 mb-2">
          {Array(rating)
            .fill("")
            .map((_, index) => (
              <span key={index} className="text-orange-500 items-end">★</span>
            ))}
        </div> */}

        <h2 className="text-black text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-600 mt-4">{description}
          {
            'أعلنت شركة شاومي عن هاتفها الاقتصادي الجديد الـ Xiaomi Redmi 13 لينافس بقوة بتصميم شيك شبيه بالايفون بظهر من الزجاج بنقشة مميزة مع معالج جديد من نوع Helio G91 Ultra مع كاميرا خلفية 108 ميجا بكسل وكاميرا أمامية 13 ميجا بكسل وبطارية بسعة كبيرة تدعم الشحن السريع بقوة 33 واط .. فدعونا نتعرف على المواصفات الكاملة لهاتف Xiaomi Redmi 13 وما هي أهم مميزاته وعيوبه وهل يستحق الشراء أم لا على النحو التالي .'
          }
        </p>
      </div>
    );
  };
  
  export default ProductTitle;
  