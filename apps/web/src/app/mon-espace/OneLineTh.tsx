import { PropsWithChildren } from 'react'

export const OneLineTh = ({
  title,
  children,
  ...props
}: PropsWithChildren<
  { title: string } & React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
>) => (
  <th {...props}>
    {title.replaceAll(' ', ' ')} {children}
  </th>
)
