'use client'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const projectNoteDataValidation = z.object({ content: z.string() })
export type ProjectNoteData = z.infer<typeof projectNoteDataValidation>

export const ProjectNoteForm = ({
  projectId,
  privateNote,
}: {
  projectId: string
  privateNote: { id: string } | null
}) => {
  const form = useForm<ProjectNoteData>()
  return <form>TODO FORM</form>
}
