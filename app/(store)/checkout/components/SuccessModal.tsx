import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { BsCheck2Circle } from "react-icons/bs";
  
  function SuccessDialog({
    open,
    requestNumber,
    onOpenChange,
  }: {
    open: boolean;
    requestNumber: string;
    onOpenChange: (status: boolean) => void;
  }) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="text-center pt-14 overflow-y-auto mdHalf:max-h-[85vh] max-h-[99vh] z-[999999999]">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4 text-primary-background">
              <BsCheck2Circle size={100} />
            </div>
            <DialogTitle className="mb-4 text-center">
              <span>تم تسجيل طلبكم بالرقم ({requestNumber})</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              <p className="lg:text-lg text-base font-semibold lg:font-bold">
                تابع طلبك عبر الموقع او التطبيق وستصلك رسالة نصية بحالة الطلب يسعدنا خدمتكم
              </p>
              <span className="mb-2 text-sm lg:text-base block">
                في حال وجود أي ملاحظات ستتواصل معكم خدمة العملاء
              </span>
              <span className="text-sm lg:text-base block">
                في حال وجود أي ملاحظات لديكم نرجو التواصل مع خدمة العملاء على رقم الواتس (777777777)
              </span>
              <button className="mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full hover:bg-orange-600 bg-primary-background transition-colors" onClick={() => onOpenChange(false)}>
                إغلاق
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default SuccessDialog;