export interface IAccordionProps {
  children: React.ReactNode | React.ReactNode[]

  /** Verbose styles */
  verbose?: boolean
}

export interface IAccordionItemProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  onClick?: () => void
  disabled?: boolean
  id?: string
  initialState?: boolean
}

export interface IAccordionHeaderProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export interface IAccordionPanelProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}