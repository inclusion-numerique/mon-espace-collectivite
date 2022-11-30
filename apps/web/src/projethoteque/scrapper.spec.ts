import { listProjects } from '@mec/web/projethoteque/scrapper'

describe('scrapper', () => {
  it.skip('Get the lists of all projects', async () => {
    const result = await listProjects()

    expect(result.projectItems.length).toBeGreaterThan(100)
    expect(result.districts.length).toBeGreaterThan(10)
    expect(result.districts).toInclude('Martinique')
  })
})

export {}
