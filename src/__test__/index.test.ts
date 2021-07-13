import { getTreatmentsWithConfig } from '..'
import { destroySplitClient } from '../splitClient'

describe('my tests', () => {
  // comment this out to see that the tests don't exit after finishing
  afterAll(async () => {
    await destroySplitClient()
  })

  it('gets treatments', async () => {
    const result = await getTreatmentsWithConfig(['JUNK'])
    expect(result.JUNK?.treatment).toStrictEqual('control')
  })
})
