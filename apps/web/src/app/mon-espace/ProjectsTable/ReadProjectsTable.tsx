import { PropsWithChildren } from 'react'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { OneLineTh } from '@mec/web/app/mon-espace/OneLineTh'
import Link from 'next/link'
import { ProjectsForDashboard } from '@mec/web/app/mon-espace/projectsForDashboard'
import { ProjectNoteButton } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteButton'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'
import { linkToAidesTerritoires } from '@mec/web/project/aidesTerritoires'

// TODO class
const Info = ({ children }: PropsWithChildren) => (
  <span style={{ fontSize: '.75rem' }}>{children}</span>
)

const FieldCell = ({ children }: PropsWithChildren) => {
  return <td>{children}</td>
}

export const ReadProjectsTable = ({
  serializedProjects,
  scope,
}: {
  serializedProjects: Serialized<ProjectsForDashboard>
  scope: DashboardScope
}) => {
  const projects = deserialize(serializedProjects)
  return (
    <div className="fr-table fr-table--bordered" style={{ width: '100%' }}>
      <table>
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
            <OneLineTh title="Surface artificialisée">
              <Info>(m2)</Info>
            </OneLineTh>
            <OneLineTh title="Émissions GES">
              <Info>(tonnes eq CO2)</Info>
            </OneLineTh>
            <OneLineTh title="Consommation d'eau">
              <Info>(m3)</Info>
            </OneLineTh>
            <OneLineTh title="Part de tri sélectif">
              <Info>(%)</Info>
            </OneLineTh>
            <OneLineTh title="Pistes cyclables">
              <Info>(km)</Info>
            </OneLineTh>
            <OneLineTh title="Consommation énergétique">
              <Info>(kWh)</Info>
            </OneLineTh>
            <th></th>
          </tr>
        </thead>
        <tbody className="fr-table">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={16}>Aucun projet n&apos;a été renseigné</td>
            </tr>
          ) : null}
          {projects.map((project) => {
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
                  {' '}
                  {(municipality ?? intercommunality)?.name.replaceAll(
                    ' ',
                    ' ',
                  )}
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
                      Voir les aides
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
          })}
        </tbody>
      </table>
    </div>
  )
}
