import Link from 'next/link'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'
import { Community, Project } from '@mec/db'
import { PropsWithChildren } from 'react'
import styles from './ProjectsTable.module.css'

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

export const ProjectsTable = ({
  projects,
}: {
  projects: (Project & { community: Community })[]
}) => {
  return (
    <div className="fr-table fr-table--bordered" style={{ width: '100%' }}>
      <table>
        <thead>
          <tr>
            <th>Nom du projet</th>
            <th>Porteur du projet</th>
            <th>Localisation</th>
            <th>Montant TTC</th>
            <th>Thématique principale</th>
            {/*<th>Thématiques secondaires</th>*/}
            <th>Email contact</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>État d’avancement</th>
            <th>
              Surface artificialisée <Info>(m2)</Info>
            </th>
            <th>
              Émissions GES <Info>(tonnes eq CO2)</Info>
            </th>
            <th>
              Consommation d&apos;eau <Info>(m3)</Info>
            </th>
            <th>
              Part de tri sélectif <Info>(%)</Info>
            </th>
            <th>
              Pistes cyclables <Info>(km)</Info>
            </th>
            <th>
              Consommation énergétique <Info>(kWh)</Info>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="fr-table">
          {projects.map(
            ({
              id,
              reference,
              name,
              community,
              totalAmount,
              topic,
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
            }) => {
              const fieldHref = (field?: string) =>
                `/mon-espace/crte/${reference}${field ? `?focus=${field}` : ''}`

              return (
                <tr key={id}>
                  <FieldCell href={fieldHref('name')}>{name}</FieldCell>
                  <FieldCell href={fieldHref('communityId')}>
                    {community.name.replaceAll(' ', ' ')}
                  </FieldCell>
                  <FieldCell href={fieldHref('communityId')}>
                    {community.id}
                  </FieldCell>
                  <FieldCell
                    href={fieldHref('totalAmount')}
                  >{`${totalAmount}`}</FieldCell>
                  <FieldCell href={fieldHref('topic')}>
                    {topic.replaceAll(' ', ' ')}
                  </FieldCell>
                  <FieldCell href={fieldHref('contactEmail')}>
                    {contactEmail}
                  </FieldCell>
                  <FieldCell href={fieldHref('start')}>
                    {start?.toLocaleDateString()}
                  </FieldCell>
                  <FieldCell href={fieldHref('end')}>
                    {end?.toLocaleDateString()}
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
                    <Link
                      prefetch={false}
                      className="fr-btn fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-icon-pencil-line"
                      href={fieldHref()}
                    >
                      Éditer
                    </Link>
                  </td>
                </tr>
              )
            },
          )}
        </tbody>
      </table>
    </div>
  )
}
