import Link from 'next/link'
import { PropsWithChildren } from 'react'
import type {
  ProjectForDashboard,
  ProjectsForDashboard,
} from '@mec/web/app/mon-espace/projectsForDashboard'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'
import { OneLineTh } from '@mec/web/app/mon-espace/OneLineTh'
import { nonBreakable } from '@mec/web/utils/nonBreakable'
import { linkToAidesTerritoires } from '@mec/web/project/aidesTerritoires'
import { ProjectNoteButton } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteButton'
import { Routes } from '@mec/web/app/routing'
import styles from '@mec/web/app/mon-espace/ProjectsTable/WriteProjectsTable.module.css'

export const WriteProjectsTable = ({
  projects,
  scope,
}: {
  projects: ProjectsForDashboard
  scope: DashboardScope
}) => {
  return (
    <div
      style={{ width: '100%' }}
      data-fr-js-table="true"
      className="fr-table fr-table--bordered"
    >
      <table
        data-fr-js-table-element="true"
        className="fr-table__shadow fr-table__shadow--right"
      >
        <thead>
          <tr>
            <OneLineTh title="Référence" />
            <OneLineTh title="Nom du projet" />
            <OneLineTh title="Porteur du projet" />
            <OneLineTh title="Montant TTC" />
            <OneLineTh title="Thématique principale" />
            {/*<OneLineTh title="Thématiques secondaires" />*/}
            <OneLineTh title="Email contact" />
            <OneLineTh title="Date de début" />
            <OneLineTh title="Date de fin" />
            <OneLineTh title="État d’avancement" />
            <OneLineTh title="Surface artificialisée" help="(m²)" />
            <OneLineTh title="Émissions GES" help="(tonnes eq CO2)" />
            <OneLineTh title="Consommation d'eau" help="(m³)" />
            <OneLineTh title="Part de tri sélectif" help="(%)" />
            <OneLineTh title="Pistes cyclables" help="(km)" />
            <OneLineTh title="Consommation énergétique" help="(kWh)" />
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={16}>Aucun projet n&apos;a été renseigné</td>
            </tr>
          ) : null}
          {projects.map((project) => (
            <WriteProjectRow key={project.id} project={project} scope={scope} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const WriteProjectRow = ({
  scope,
  project,
}: {
  project: ProjectForDashboard
  scope: DashboardScope
}) => {
  const {
    id,
    reference,
    name,
    municipality,
    intercommunality,
    totalAmount,
    category,
    contactEmail,
    start,
    end,
    progress,
    artificializedArea,
    greenhouseGasEmissions,
    waterConsumption,
    selectiveSortingPercentage,
    bikePathLength,
    energyConsumption,
  } = project
  const fieldHref = (field?: string) =>
    Routes.MonEspace.Projet.Modifier(reference, { focus: field })

  return (
    <tr key={id}>
      <td>{reference}</td>
      <FieldCell href={fieldHref('name')}>{nonBreakable(name)}</FieldCell>
      <FieldCell href={fieldHref('municipalityId')}>
        {nonBreakable((municipality ?? intercommunality)?.name)}
      </FieldCell>
      <FieldCell href={fieldHref('totalAmount')}>{`${totalAmount}`}</FieldCell>
      <FieldCell href={fieldHref('categoryId')}>
        {category.theme.name.replaceAll(' ', ' ')}&nbsp;/&nbsp;
        {category.name.replaceAll(' ', ' ')}
      </FieldCell>
      <FieldCell href={fieldHref('contactEmail')}>{contactEmail}</FieldCell>
      <FieldCell href={fieldHref('start')}>
        {nonBreakable(start?.toLocaleDateString())}
      </FieldCell>
      <FieldCell href={fieldHref('end')}>
        {nonBreakable(end?.toLocaleDateString())}
      </FieldCell>
      <FieldCell href={fieldHref('progress')}>{progress}</FieldCell>
      <FieldCell href={fieldHref('artificializedArea')}>
        {artificializedArea}
      </FieldCell>
      <FieldCell href={fieldHref('greenhouseGasEmissions')}>
        {greenhouseGasEmissions}
      </FieldCell>
      <FieldCell href={fieldHref('waterConsumption')}>
        {waterConsumption}
      </FieldCell>
      <FieldCell href={fieldHref('selectiveSortingPercentage')}>
        {selectiveSortingPercentage}
      </FieldCell>
      <FieldCell href={fieldHref('bikePathLength')}>{bikePathLength}</FieldCell>
      <FieldCell href={fieldHref('energyConsumption')}>
        {energyConsumption}
      </FieldCell>
      <td>
        <div className={styles.actionsContainer}>
          <Link
            href={linkToAidesTerritoires(project)}
            target="_blank"
            rel="noreferrer"
            className="fr-btn"
          >
            Voir&nbsp;les&nbsp;aides
          </Link>
          <Link
            prefetch={false}
            className="fr-ml-4v  fr-mr-4v fr-btn fr-btn--icon-left fr-btn--secondary fr-icon-pencil-line"
            href={fieldHref()}
          >
            Éditer
          </Link>
          <ProjectNoteButton
            project={{ id: project.id, name: project.name }}
            projectNote={
              project.notes[0]
                ? {
                    id: project.notes[0].id,
                    content: project.notes[0].content,
                  }
                : null
            }
            scope={scope}
          />
        </div>
      </td>
    </tr>
  )
}

const FieldCell = ({ children, href }: PropsWithChildren<{ href: string }>) => (
  <td className={`fr-p-0 ${styles.fieldCell}`}>
    <Link className="fr-p-4v" href={href} prefetch={false}>
      {children}
      <span
        className={`fr-icon--sm fr-icon-pencil-line fr-ml-1v ${styles.editIcon}`}
      />
    </Link>
  </td>
)
