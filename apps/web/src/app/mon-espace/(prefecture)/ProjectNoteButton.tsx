import Link from 'next/link'

export const ProjectNoteButton = ({
  projectId,
  privateNote,
}: {
  projectId: string
  privateNote: { id: string } | null
}) => {
  return (
    <Link
      href="/"
      prefetch={false}
      className="fr-btn fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-icon-pencil-line"
    >
      Ajouter une note privée
    </Link>
  )
}
