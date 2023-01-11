import { redirect } from 'next/navigation'
import { Routes } from '@mec/web/app/routing'

const DashboardPage = () => {
  // For now there is no dashboard but we see the list of projects
  redirect(Routes.MonEspace.Projets.Index)
  return null
}
export default DashboardPage
