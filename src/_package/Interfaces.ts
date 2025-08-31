export interface IAccordionProps {
  children: React.ReactNode | React.ReactNode[]

  id?: string

  /** Verbose styles */
  verbose?: boolean

  /** Define if opening one accordion item will close rest
   * @default false
   */
  singleOpen?: boolean
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
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export interface IAccordionPanelProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}