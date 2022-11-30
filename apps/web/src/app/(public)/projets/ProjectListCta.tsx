import Link from 'next/link'
import { CSSProperties } from 'react'

export const ProjectListCta = ({
  nomargin,
  style,
}: {
  nomargin?: boolean
  style?: CSSProperties
}) => {
  return (
    <li key="cta" className={`${nomargin ? '' : 'fr-mt-8v'}`} style={style}>
      <div
        className={`fr-p-4v`}
        style={{
          textAlign: 'center',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px 0 rgba(0,0,0,0.1)',
        }}
      >
        <h6 style={{ width: '100%' }}>
          Vous êtes maire ou président d&apos;intercommunalité ?
        </h6>
        <Link
          className={`fr-btn`}
          href="/projet"
          style={{ textAlign: 'center' }}
        >
          Partagez vos solutions&nbsp;!
        </Link>
      </div>
    </li>
  )
}
