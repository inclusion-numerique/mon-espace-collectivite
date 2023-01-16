import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ProjectNoteButton } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteButton'
import { linkToAidesTerritoires } from '@mec/web/project/aidesTerritoires'
import { Scope } from '@mec/web/scope'
import {
  ProjectListItem,
  ProjectsList,
} from '@mec/web/app/mon-espace/projets/projectsList'
import { OneLineTh } from '@mec/web/app/mon-espace/ProjectsTable/OneLineTh'

export const ReadProjectsTable = ({
  projects,
  scope,
}: {
  projects: ProjectsList
  scope: Scope
}) => {
  return (
    <div
      className="fr-table fr-table--bordered"
      style={{ width: '100%' }}
      data-fr-js-table="true"
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
            <ReadProjectRow key={project.id} project={project} scope={scope} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ReadProjectRow = ({
  scope,
  project,
}: {
  project: ProjectListItem
  scope: Scope
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
    notes,
  } = project
  return (
    <tr key={id}>
      <FieldCell>{reference}</FieldCell>
      <FieldCell>{name.replaceAll(' ', ' ')}</FieldCell>
      <FieldCell>
        {(municipality ?? intercommunality)?.name.replaceAll(' ', ' ')}
      </FieldCell>
      <FieldCell>{`${totalAmount}`}</FieldCell>
      <FieldCell>
        {category.theme.name.replaceAll(' ', ' ')}&nbsp;/&nbsp;
        {category.name.replaceAll(' ', ' ')}
      </FieldCell>
      <FieldCell>{contactEmail}</FieldCell>
      <FieldCell>{start?.toLocaleDateString()}</FieldCell>
      <FieldCell>{end?.toLocaleDateString()}</FieldCell>
      <FieldCell>{progress}</FieldCell>
      <FieldCell>{artificializedArea}</FieldCell>
      <FieldCell>{greenhouseGasEmissions}</FieldCell>
      <FieldCell>{waterConsumption}</FieldCell>
      <FieldCell>{selectiveSortingPercentage}</FieldCell>
      <FieldCell>{bikePathLength}</FieldCell>
      <FieldCell>{energyConsumption}</FieldCell>
      <td>
        {/*TODO class*/}
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Link
            href={linkToAidesTerritoires(project)}
            target="_blank"
            rel="noreferrer"
            className="fr-btn fr-mr-4v"
          >
            Voir&nbsp;les&nbsp;aides
          </Link>
          <ProjectNoteButton
            project={{ id, name }}
            projectNote={
              notes[0]
                ? {
                    id: notes[0].id,
                    content: notes[0].content,
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

const FieldCell = ({ children }: PropsWithChildren) => <td>{children}</td>
