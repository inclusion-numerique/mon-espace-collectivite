import Link from 'next/link'
import { PropsWithChildren } from 'react'
import styles from './WriteProjectsTable.module.css'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { OneLineTh } from '@mec/web/app/mon-espace/OneLineTh'
import { linkToAidesTerritoires } from '@mec/web/project/aidesTerritoires'
import { ProjectsForDashboard } from '@mec/web/app/mon-espace/projectsForDashboard'
import { nonBreakable } from '@mec/web/utils/nonBreakable'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'
import { ProjectNoteButton } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteButton'

// TODO class
const Info = ({ children }: PropsWithChildren) => (
  <span style={{ fontSize: '.75rem' }}>{children}</span>
)

const FieldCell = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  return (
    <td className={`fr-p-0 ${styles.fieldCell}`}>
      <Link className="fr-p-4v" href={href} prefetch={false}>
        {children}
        <span
          className={`fr-icon--sm fr-icon-pencil-line fr-ml-1v ${styles.editIcon}`}
        />
      </Link>
    </td>
  )
}

export const WriteProjectsTable = ({
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
            } = project
            const fieldHref = (field?: string) =>
              `/mon-espace/projet/${reference}${field ? `?focus=${field}` : ''}`

            return (
              <tr key={id}>
                <td>{reference}</td>
                <FieldCell href={fieldHref('name')}>
                  {nonBreakable(name)}
                </FieldCell>
                <FieldCell href={fieldHref('municipalityId')}>
                  {nonBreakable((municipality ?? intercommunality)?.name)}
                </FieldCell>
                <FieldCell
                  href={fieldHref('totalAmount')}
                >{`${totalAmount}`}</FieldCell>
                <FieldCell href={fieldHref('categoryId')}>
                  {category.theme.name.replaceAll(' ', ' ')}&nbsp;/&nbsp;
                  {category.name.replaceAll(' ', ' ')}
                </FieldCell>
                <FieldCell href={fieldHref('contactEmail')}>
                  {contactEmail}
                </FieldCell>
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
                <FieldCell href={fieldHref('bikePathLength')}>
                  {bikePathLength}
                </FieldCell>
                <FieldCell href={fieldHref('energyConsumption')}>
                  {energyConsumption}
                </FieldCell>
                <td>
                  {/*TODO class*/}
                  <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    <Link
                      href={linkToAidesTerritoires(project)}
                      target="_blank"
                      rel="noreferrer"
                      className="fr-btn"
                    >
                      Voir les aides
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
          })}
        </tbody>
      </table>
    </div>
  )
}
