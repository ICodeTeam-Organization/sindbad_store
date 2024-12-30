import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";

type QuestionType = {
  id: number;
  question: string;
  answer: string;
  classification: string;
  displayOrder: number;
  imagesUrls: string[];
};

function HowDialog({
  open = null,
  id = 0,
  onOpenChange,
}: {
  open: number | null;
  id: number;
  onOpenChange: (status: boolean) => void;
}) {
  const { data: question, isFetching } = useQuery<{
    data: QuestionType;
  }>({
    queryKey: ["get-qustion-details"],
    queryFn: () => getApi("FAQs/" + id),
    enabled: id > 0 && id != null,
  });

  return (
    <Dialog open={open != null} onOpenChange={onOpenChange}>
      {isFetching ? (
        <DialogContent className="text-center pt-14 overflow-y-auto mdHalf:max-h-[85vh] max-h-[99vh] z-[999999999]  flex items-center justify-center ">
          <div className="flex items-center justify-center mb-4 ">
            <div className="w-10 h-10 border-4 border-primary-background border-t-transparent rounded-full animate-spin"></div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="text-center pt-14 overflow-y-auto mdHalf:max-h-[85vh] max-h-[99vh] z-[999999999]  ">
          <DialogHeader>
            <DialogTitle className="mb-4 text-center">
              {question?.data?.question}
            </DialogTitle>

            <DialogDescription className="text-center">
              <p className="text-black">{question?.data?.answer}</p>
              {question?.data && question?.data?.imagesUrls?.length > 0 && (
                <h1 className="text-black font-bold my-8"> الخطوات : </h1>
              )}
              {question?.data && question?.data?.imagesUrls?.length > 0 && (
                <Carousel opts={{ direction: "rtl" }}>
                  <div className="absolute rotate-180 left-16 -top-10 flex items-center justify-center z-10">
                    <CarouselPrevious className=" -left-6 text-[#F58634]" />
                    <CarouselNext className=" text-[#F58634]" />
                  </div>
                  <CarouselContent dir="rtl">
                    {question?.data?.imagesUrls.map((item, index) => (
                      <CarouselItem className="w-full" key={index}>
                        <div>
                          <div className="">
                            <h1 className="text-lg text-primary-background bg-zinc-100 w-10 h-10 flex items-center justify-center  rounded-full ">
                              {index + 1}
                            </h1>
                          </div>
                          <div className="flex items-center justify-center overflow-hidden w-full my-5">
                            <img
                              alt={(index + 1).toString()}
                              src={item}
                              className="object-contain rounded-sm"
                            />
                          </div>
                          <div>
                            <p className="text-black">
                              {/* هنا وصف للصورة اذا بغوه */}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default HowDialog;
