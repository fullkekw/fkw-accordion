import './styles.scss';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';

import { IAccordionHeaderProps, IAccordionItemProps, IAccordionPanelProps, IAccordionProps } from "./Interfaces";
import { createStringID, EFKW } from '../components/handlers';



interface IAccordionContext {
  verbose: boolean
}

interface IItemConext {
  isOpen: boolean
  toggle: () => void
  id: string
}

// @ts-expect-error Context does not require initial state
const AccordionContext = createContext<IAccordionContext>({});
// @ts-expect-error Context does not require initial state
const ItemContext = createContext<IItemConext>({});



export const Accordion: React.FC<IAccordionProps> = ({ children, verbose }) => {
  verbose = verbose ?? false;

  return <AccordionContext.Provider value={{
    verbose
  }}>
    {children}
  </AccordionContext.Provider>;
};

/** Must contain AccordionHeader & AccordionPanel */
export const AccordionItem: React.FC<IAccordionItemProps> = ({ children, className, onClick, disabled, id, initialState }) => {
  const accCtx = useContext(AccordionContext);

  const [isOpen, setIsOpen] = useState(initialState ?? false);
  const [ID] = useState(id ?? createStringID(6));

  const paddingsRef = useRef<number[]>([]);
  const itemRef = useRef<HTMLButtonElement>(null);



  // Init
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const item = itemRef.current;
    if (!item) throw new EFKW(`Item ref is not found`);

    const headers = item.querySelectorAll('.fkw-accordion-header');
    const panels = item.querySelectorAll('.fkw-accordion-panel');

    if (headers.length !== 1) throw new EFKW(`Only one AccordionHeader must be inside AccordionItem`);
    if (panels.length !== 1) throw new EFKW(`Only one AccordionPanel must be inside AccordionItem`);

    const panel = panels[0] as HTMLDivElement;

    const paddings = window.getComputedStyle(panel).padding;
    const transition = window.getComputedStyle(panel).transition;

    const paddingY = Number(paddings.split(' ')[0]?.replace('px', '') ?? '0');
    const paddingX = Number(paddings.split(' ')[1]?.replace('px', '') ?? '0');

    paddingsRef.current = [paddingX, paddingY];

    // Prevent layout shifting due to remove Y paddings
    panel.style.transition = 'none';
    panel.style.padding = `0px ${paddingX}px`;

    // Prevent transition
    setTimeout(() => {
      panel.style.transition = transition;
    }, 1);
  }, []);

  // Handle isOpen
  useEffect(() => {
    const item = itemRef.current as HTMLButtonElement;
    const panel = item.querySelector('.fkw-accordion-panel') as HTMLDivElement;

    const paddingY = paddingsRef.current[1];

    if (isOpen) {
      panel.style.maxHeight = `${panel.scrollHeight + (paddingY * 2)}px`;
    } else {
      panel.style.maxHeight = `0px`;
    }
  }, [isOpen]);



  function toggle() {
    setIsOpen(prev => !prev);
  }



  return <ItemContext.Provider value={{
    isOpen,
    toggle,
    id: ID
  }}>
    <button className={cn(`fkw-accordion-item`, accCtx.verbose && 'fkw-accordion--verbose', className)} onClick={() => { toggle(), onClick ? onClick() : null; }} disabled={disabled} id={`fkw-accordion-item--${ID}`} ref={itemRef} tabIndex={0} aria-controls={`fkw-accordion-panel--${ID}`}>
      {children}
    </button>
  </ItemContext.Provider>;
};

export const AccordionHeader: React.FC<IAccordionHeaderProps> = ({ children, className }) => {
  const itemCtx = useContext(ItemContext);
  const { id, isOpen } = itemCtx;

  return <div className={cn(`fkw-accordion-header`, isOpen && 'fkw-accordion-header--active', className)} id={`fkw-accordion-header--${id}`}>
    {children}
  </div>;
};

export const AccordionPanel: React.FC<IAccordionPanelProps> = ({ children, className }) => {
  const itemCtx = useContext(ItemContext);
  const { id, isOpen } = itemCtx;

  return <div className={cn(`fkw-accordion-panel`, isOpen && 'fkw-accordion-panel--active', className)} id={`fkw-accordion-panel--${id}`} tabIndex={0} role='region' aria-hidden={isOpen} aria-labelledby={`fkw-accordion-item--${id}`}>
    {children}
  </div>;
};