import React, { useEffect, useState } from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from './_package';

const Home: React.FC = () => {
  const [state, setState] = useState(true);

  useEffect(() => {
    console.log(`Out state - `, state);
  }, [state]);

  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500 p-[50px] flex flex-col items-start gap-[20px]">
      <button onClick={() => setState(prev => !prev)}>
        <p>change state</p>
      </button>

      <Accordion verbose singleOpen>
        <AccordionItem state={state} stateSetter={setState}>

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

      <Accordion>
        <AccordionItem>

          <AccordionHeader>
            <p>Item 1</p>
          </AccordionHeader>

          <AccordionPanel>
            <p>Content 1</p>
          </AccordionPanel>

        </AccordionItem>

        <AccordionItem>

          <AccordionHeader>
            <p>Item 1</p>
          </AccordionHeader>

          <AccordionPanel>
            <p>Content 1</p>
          </AccordionPanel>

        </AccordionItem>
      </Accordion>

      <Accordion>
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