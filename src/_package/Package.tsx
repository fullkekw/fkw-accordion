import './styles.scss';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';

import { IAccordionHeaderProps, IAccordionItemProps, IAccordionPanelProps, IAccordionProps } from "./Interfaces";
import { createStringID, EFKW } from '../components/handlers';



interface IAccordionContext {
  verbose: boolean
  singleOpen: boolean
  id: string
}

interface IItemConext {
  isOpen: boolean
  toggle: () => void
  id: string

  onClick?: () => void
  disabled: boolean
}

// @ts-expect-error Context does not require initial state
const AccordionContext = createContext<IAccordionContext>({});
// @ts-expect-error Context does not require initial state
const ItemContext = createContext<IItemConext>({});



/** Accordions context provider */
export const Accordion: React.FC<IAccordionProps> = ({ children, verbose, singleOpen, id }) => {
  const [ID] = useState(id ?? createStringID(6));

  verbose = verbose ?? false;
  singleOpen = singleOpen ?? false;

  return <AccordionContext.Provider value={{
    verbose,
    singleOpen,
    id: ID,
  }}>
    {children}
  </AccordionContext.Provider>;
};

/** Accordion. Must contain AccordionHeader & AccordionPanel */
export const AccordionItem: React.FC<IAccordionItemProps> = ({ children, className, onClick, disabled, id, state, stateSetter, panelTransitionTimingModifier, ...props }) => {
  const accCtx = useContext(AccordionContext);
  const { singleOpen, verbose, id: accordionId } = accCtx;

  const [isOpen, setIsOpen] = useState(state ?? false);
  const [ID] = useState(id ?? createStringID(6));

  const paddingsRef = useRef<number[]>([]);
  const itemRef = useRef<HTMLDivElement>(null);

  panelTransitionTimingModifier = panelTransitionTimingModifier === null ? null : panelTransitionTimingModifier ?? 1;
  disabled = disabled ?? false;



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
      if (panelTransitionTimingModifier !== null) {
        panel.style.transition = transition;
        panel.style.transitionDuration = `${(panel.scrollHeight + (paddingY * 2)) * panelTransitionTimingModifier!}ms`;
      }
    }, 1);
  }, []);

  // Handle singleOpen
  useEffect(() => {
    if (!singleOpen) return;

    const item = itemRef.current as HTMLDivElement;

    const observer = new MutationObserver(() => {
      if (item.classList.contains('fkw-accordion--singleOpen')) {
        item.classList.remove('fkw-accordion--singleOpen');
        toggle(false);
      }
    });

    observer.observe(item, {
      attributes: true
    });
  }, []);

  // Handle isOpen
  useEffect(() => {
    const item = itemRef.current as HTMLDivElement;
    const panel = item.querySelector('.fkw-accordion-panel') as HTMLDivElement;

    const paddingY = paddingsRef.current[1];

    if (isOpen) {
      panel.style.padding = `${paddingY}px ${paddingsRef.current[0]}px`;
      panel.style.maxHeight = `${panel.scrollHeight + (paddingY * 2)}px`;

      if (singleOpen) {
        const items = document.querySelectorAll(`[data-fkw-accordion="${accordionId}"]`) as NodeListOf<HTMLDivElement>;

        items.forEach(item => {
          if (item.id === `fkw-accordion-item--${ID}`) return;

          item.classList.add('fkw-accordion--singleOpen');
        });
      }
    } else {
      panel.style.padding = `0 ${paddingsRef.current[0]}px`;
      panel.style.maxHeight = `0px`;
    }
  }, [isOpen]);

  //* Sync inner state when out changed
  useEffect(() => {
    if (state === undefined) return;

    setIsOpen(state);
  }, [state]);



  function toggle(forceState?: boolean) {
    if (!forceState && disabled) return console.warn(`[fkw-accordion]: Item is disabled and can not change it's state`);

    const to = forceState ?? !isOpen;

    if (stateSetter !== undefined && state !== undefined) {
      //* Sync only out state with inner
      stateSetter(to);
    } else if (stateSetter !== undefined && state === undefined) {
      //* Sync both states
      stateSetter(to);
      setIsOpen(to);
    } else {
      //* Sync only inner state with out
      setIsOpen(to);
    }
  }



  return <ItemContext.Provider value={{
    isOpen,
    toggle,
    id: ID,
    disabled,
    onClick,
  }}>
    <div className={cn(`fkw-accordion-item`, verbose && 'fkw-accordion--verbose', className)} id={`fkw-accordion-item--${ID}`} ref={itemRef} data-fkw-accordion={accordionId} {...props}>
      {children}
    </div>
  </ItemContext.Provider>;
};

/** Actually, this is a button that change state */
export const AccordionHeader: React.FC<IAccordionHeaderProps> = ({ children, className, ...props }) => {
  const itemCtx = useContext(ItemContext);
  const { id, isOpen, disabled, toggle, onClick } = itemCtx;

  return <button className={cn(`fkw-accordion-header`, isOpen && 'fkw-accordion-header--active', className)} tabIndex={0} aria-controls={`fkw-accordion-panel--${id}`} id={`fkw-accordion-header--${id}`} onClick={() => { toggle(), onClick ? onClick() : null; }} disabled={disabled} {...props}>
    {children}
  </button>;
};

/** Accordion content */
export const AccordionPanel: React.FC<IAccordionPanelProps> = ({ children, className, ...props }) => {
  const itemCtx = useContext(ItemContext);
  const { id, isOpen } = itemCtx;

  return <div className={cn(`fkw-accordion-panel`, isOpen && 'fkw-accordion-panel--active', className)} id={`fkw-accordion-panel--${id}`} tabIndex={0} role='region' aria-hidden={isOpen} aria-labelledby={`fkw-accordion-item--${id}`} {...props}>
    {children}
  </div>;
};