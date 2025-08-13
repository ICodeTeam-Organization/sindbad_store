"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";
import { faqList } from "../components/AboutSidebar";
  

function FAQs() {
  const [openedFAQ, setopenedFAQ] = useState(faqList.filter(e=>!!e.answer).map((_,idx)=>`faq-${idx}`))
  return (
    <section id="FAQs" className="scroll-mt-28">
      <h2 className="text-3xl font-bold mb-6">الأسئلة الشائعة</h2>
      <div>
        <Accordion type="multiple" value={openedFAQ} onValueChange={(s)=>setopenedFAQ(s)} className="w-full space-y-2">
          {faqList.filter(e=>!!e.answer).map(({ question, answer , id }, idx) => (
            <AccordionItem  id={id} key={idx} value={`faq-${idx}`} className="scroll-mt-28">
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQs;
