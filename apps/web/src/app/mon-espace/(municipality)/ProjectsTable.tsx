import Link from 'next/link'
import { Community, Project } from '@prisma/client'
import { PropsWithChildren } from 'react'
import styles from './ProjectsTable.module.css'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { OneLineTh } from '@mec/web/app/mon-espace/OneLineTh'

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
  serializedProjects,
}: {
  serializedProjects: Serialized<(Project & { community: Community })[]>
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
            <OneLineTh title="Localisation" />
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
                  <td>{reference}</td>
                  <FieldCell href={fieldHref('name').replaceAll(' ', ' ')}>
                    {name}
                  </FieldCell>
                  <FieldCell href={fieldHref('communityId')}>
                    {community.name.replaceAll(' ', ' ')}
                  </FieldCell>
                  <FieldCell href={fieldHref('communityId')}>
                    {community.name.replaceAll(' ', ' ')}
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
