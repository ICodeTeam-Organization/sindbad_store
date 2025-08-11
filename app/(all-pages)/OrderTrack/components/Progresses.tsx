import { Package, Clock, CheckCircle, CreditCard, Truck, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"
import { convertToArabicDate } from "@/lib/timeFuns";

interface ShippingProgressProps {
  status: number; // 0-6
  statusDates: (string | null)[]
}

const steps = [
  {
    id: 0,
    title: "  إنشاء الطلب",
    subtitle: "قيد الانتظار",
    icon: Clock,
  },
  {
    id: 1,
    title: "  قبول الطلب",
    subtitle: "تحت التأكيد",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "  شراء الطلب",
    subtitle: "مكتمل",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "شحن الطلب",
    subtitle: "مكتمل",
    icon: Package,
  },
  {
    id: 4,
    title: "وصول الطلب",
    subtitle: "مكتمل",
    icon: Truck,
  },
  {
    id: 5,
    title: "تسليم الطلب",
    subtitle: "مكتمل",
    icon: Handshake,
  },
]

export default function ShippingProgress({ statusDates, status }: ShippingProgressProps) {

   
  const getStepStatus = (stepId: number) => {
    if (stepId <= status) return "completed"
    if (status + 1 == stepId) return "current"
    return "pending"
  }

  const getStepColor = (stepId: number) => {
    const stepStatus = getStepStatus(stepId)
    if (stepStatus === "completed") return "bg-green-500 border-white"
    if (stepStatus === "current") return "bg-primary border-white"
    return "bg-gray-100 border-gray-200"
  }

  const progressPercentage = status === 0 ? 0 : ((  status) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-white p-10  rounded-md shadow-sm">
      <h3 className="mdHalf:text-2xl text-lg font-bold pb-10"> مراحل الشحن </h3>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-[48px] left-8 right-8 h-1 bg-gray-300 rounded-full">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const stepStatus = getStepStatus(index)

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative z-10",
                      getStepColor(index),
                      stepStatus == "current" && "shadow-lg",
                    )}
                  >
                    {stepStatus === "completed" ? (
                      <CheckCircle className="w-9 h-9 text-white" />
                    ) : (
                      <Icon className={cn("w-9 h-9", stepStatus === "pending" ? "text-gray-600" : "text-white")} />
                    )}
                  </div>

                  {/* Labels */}
                  <div className="mt-4 text-center max-w-24">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{step.title}</p>
                    <p
                      className={cn(
                        "text-xs mt-1 bg-bg-50 rounded-full py-1 px-3 mx-auto w-fit",
                        stepStatus === "completed"
                          ? "text-green-600"
                          : stepStatus === "current"
                            ? "text-primary"
                            : "text-gray-500",
                      )}
                    >
                      {stepStatus === "completed" ? "مكتمل" : stepStatus === "current" ? "تحت المعالجة" : "قيد الانتظار"}
                    </p>
                    {stepStatus !== "pending" && statusDates[index] && <p className="text-xs text-gray-400 mt-1">{convertToArabicDate(statusDates[index])}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const stepStatus = getStepStatus(index)

            return (
              <div key={step.id} className="flex items-start gap-4 pb-8 last:pb-0">
                {/* Vertical Line */}
                {index < steps.length - 1 && <div className="absolute right-6 top-12 w-0.5 h-96 bg-gray-300" />}

                {/* Circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-3 flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10",
                    getStepColor(index),
                    "shadow-md",
                  )}
                >
                  {stepStatus === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className={cn("w-5 h-5", stepStatus === "pending" ? "text-gray-600" : "text-white")} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          stepStatus === "completed"
                            ? "text-green-600"
                            : stepStatus === "current"
                              ? "text-primary"
                              : "text-gray-500",
                        )}
                      >
                        {stepStatus === "completed"
                          ? "مكتمل"
                          : stepStatus === "current"
                            ? "تحت المعالجة"
                            : "قيد الانتظار"}
                      </p>
                    </div>
                    {stepStatus !== "pending" && statusDates[index] && <p className="text-xs text-gray-400">{convertToArabicDate(statusDates[index])}</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
