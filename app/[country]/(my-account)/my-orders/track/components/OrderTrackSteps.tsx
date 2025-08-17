import { Package } from "lucide-react"

const OrderTrackSteps = () => {
  const steps = [
    {
      id: 0,
      title: "تم قبول طلبك نجاح",
      description:
        "شكراً لك! لقد تم قبول الطلب من قبل الإدارة وجاري الآن استكمال عملية الشراء. سيتم إشعارك عند إتمام الشراء والانتقال إلى المرحلة التالية.",
    },
    {
      id: 1,
      title: "تم شراء الطلب",
      description: "تم شراء المنتجات المطلوبة بنجاح وجاري الآن التجهيز لعملية التسليم",
    },
    {
      id: 2,
      title: "تم شحن الطلب",
      description:
        "تم تجهيز الطلب وإرساله إلى مندوب التوصيل. جاري تسليم الطلب لشركة الشحن المحددة للطلب وبدء مرحلة التوصيل.",
    },
    {
      id: 3,
      title: "وصول الطلب",
      description:
        "تم تسليم الطلب إلى مندوب التوصيل، وهو الآن مستعد لتوصيله إلى عنوانك. سيتم التواصل معك قريباً لتنسيق موعد التسليم.",
    },
    {
      id: 4,
      title: "تم تسليم الطلب بنجاح",
      description: "تم توصيل الطلب إلى عنوانك واستلامه من قبلك. نشكرك على ثقتك بنا، ونتمنى أن تكون راضياً عن خدماتنا.",
    },
  ]

  const status = 5

  const getStepStatus = (stepId: number) => {
    if (stepId <= status) return "completed"
    return "pending"
  }

  return (
    <div className=" bg-white rounded-md shadow-sm mt-2 p-6" dir="rtl">
        <h3 className=" mb-10 mt-4 mx-4 mdHalf:text-2xl text-lg font-bold text-secondary"> مراحل تتبع الطلب </h3>
      <div className="relative m-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
            {/* Vertical line */}
            {index < steps.length - 1 && <div className="absolute right-6 top-12 w-0.5 h-16 bg-gray-200" />}

            {/* Icon circle */}
            <div
              className={`
              relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ml-4
              ${
                getStepStatus(step.id) === "completed"
                  ? "bg-orange-500 border-orange-500"
                  : "bg-gray-200 border-gray-300"
              }
            `}
            >
              <Package
                className={`w-6 h-6 ${getStepStatus(step.id) === "completed" ? "text-white" : "text-gray-500"}`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  getStepStatus(step.id) === "completed" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  getStepStatus(step.id) === "completed" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderTrackSteps
