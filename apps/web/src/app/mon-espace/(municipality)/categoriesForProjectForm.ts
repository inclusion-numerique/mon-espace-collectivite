import { prismaClient } from '@mec/web/prismaClient'
import { OptionsGroups } from '@mec/web/utils/options'

export const getCategoriesOptionsForProjectForm =
  async (): Promise<OptionsGroups> => {
    const themes = await prismaClient.projectTheme.findMany({
      include: { categories: true },
    })

    return Object.fromEntries(
      themes.map((theme) => [
        theme.name,
        theme.categories.map(({ id, name }) => ({ name, value: id })),
      ]),
    )
  }
