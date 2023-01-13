import { Spinner } from '@mec/web/ui/Spinner'

const ProjectsLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: 200,
        flex: 1,
      }}
    >
      <Spinner />
    </div>
  )
}

export default ProjectsLoading
