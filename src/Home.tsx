import React, { useEffect, useState } from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './_package';

const Home: React.FC = () => {
  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500 p-[50px] flex flex-col items-start gap-[20px]">
      <Accordion verbose>
        <AccordionItem>

          <AccordionHeader>
            <p>header</p>
          </AccordionHeader>

          <AccordionPanel className="px-[24px] py-[16px]">
            <p>fsdsfdsdfsdf</p>
            <p>fsdsfdsdfsdf</p>
            <p>fsdsfdsdfsdf</p>
            <p>fsdsfdsdfsdf</p>
            <p>fsdsfdsdfsdf</p>
          </AccordionPanel>

        </AccordionItem>
      </Accordion>

      <Accordion verbose>
        <AccordionItem>

          <AccordionHeader>
            <p>header</p>
          </AccordionHeader>

          <AccordionPanel>
            <p>fsdsfdsdfsdf</p>
          </AccordionPanel>

        </AccordionItem>
      </Accordion>

      <Accordion verbose>
        <AccordionItem>

          <AccordionHeader>
            <p>header</p>
          </AccordionHeader>

          <AccordionPanel>
            <p>fsdsfdsdfsdf</p>
          </AccordionPanel>

        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Home;