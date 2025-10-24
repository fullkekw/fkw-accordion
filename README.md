# 🛑 DEPRECATED 🛑

This package is reworked into [@fullkekw/accordion](https://github.com/fullkekw/accordion) and no longer be supported

React accordion typescript component. Compatible with nextjs & vite!

## Features
- Simple usage
- Manipulating menu state out of component
- Support opening only 1 accordion per time
- Implements [WAI-Aria accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)

## Examples
Default implementation
```tsx
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fullkekw/fkw-accordion';
import '@fullkekw/fkw-accordion/css' // Required styles

const Page: NextPage = () => {
  return <Accordion>
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
}
```

Reading state & closing other accordions
```tsx
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fullkekw/fkw-accordion';
import '@fullkekw/fkw-accordion/css' // Required styles

const Page: NextPage = () => {
  const [state, setState] = useState(true);

  useEffect(() => {
    console.log(`Out state - `, state);
  }, [state]);
  
  return <Accordion singleOpen>
    <AccordionItem state={state} stateSetter={setState}>

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
}
```

## API
```tsx
export interface IAccordionProps {
    children: React.ReactNode | React.ReactNode[];
    id?: string;
    /** Verbose styles */
    verbose?: boolean;
    /** Define if opening one accordion item will close rest
     * @default false
     */
    singleOpen?: boolean;
}

export interface IAccordionItemProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  onClick?: () => void
  disabled?: boolean
  id?: string

  /** Sync out state with current accordion state */
  state?: boolean

  /** Sync out state with current accordion state */
  stateSetter?: (state: boolean) => void

  /** 
   * Defines transition timing modifier per 100px, where 1px = 1ms * modifier. 
   * Transition can be disabled by passing null 
   * 
   * @default 1
   */
  panelTransitionTimingModifier?: number | null
}

export interface IAccordionHeaderProps extends React.DetailsHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}

export interface IAccordionPanelProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}

```

## Installation
Using npm
```
npm install @fullkekw/fkw-accordion
```

Using pnpm
```
pnpm install @fullkekw/fkw-accordion
```

Using yarn
```
yarn add @fullkekw/fkw-accordion
```

Licensed under MIT <br>
fullkekw © 2023 - 2025
