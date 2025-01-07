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

export interface IAccordionItemProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  onClick?: () => void
  disabled?: boolean
  id?: string

  /** Sync out state with current accordion state */
  state?: boolean

  /** Sync out state with current accordion state */
  stateSetter?: (state: boolean) => void
}

export interface IAccordionHeaderProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export interface IAccordionPanelProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}