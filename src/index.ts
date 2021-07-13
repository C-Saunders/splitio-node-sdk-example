import SplitIO from '@splitsoftware/splitio/types/splitio'
import { getSplitClient } from './splitClient'

export async function getTreatmentsWithConfig(splitNames: string[]): Promise<SplitIO.TreatmentsWithConfig> {
  const client = await getSplitClient()

  return client.getTreatmentsWithConfig('', splitNames)
}

