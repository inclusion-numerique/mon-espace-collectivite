import Link from 'next/link'
import { Community, Project } from '@prisma/client'
import { PropsWithChildren } from 'react'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { OneLineTh } from '@mec/web/app/mon-espace/OneLineTh'
import { ProjectNoteButton } from '@mec/web/app/mon-espace/(prefecture)/ProjectNoteButton'

// TODO class
const Info = ({ children }: PropsWithChildren) => (
  <span style={{ fontSize: '.75rem' }}>{children}</span>
)

const FieldCell = ({ children }: PropsWithChildren) => {
  return <td>{children}</td>
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
              return (
                <tr key={id}>
                  <FieldCell>{name}</FieldCell>
                  <FieldCell>{community.name.replaceAll(' ', ' ')}</FieldCell>
                  <FieldCell>{community.id}</FieldCell>
                  <FieldCell>{`${totalAmount}`}</FieldCell>
                  <FieldCell>{topic.replaceAll(' ', ' ')}</FieldCell>
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
                    <ProjectNoteButton projectId={id} privateNoteId={null} />
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
