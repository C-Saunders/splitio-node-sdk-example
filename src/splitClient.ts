import { SplitFactory } from '@splitsoftware/splitio'
import AsyncLock from 'async-lock'
import pEvent from 'p-event'

/*
From the Split.io docs
> We recommend keeping only one instance of the client at all times (singleton pattern) and reusing it throughout your application.
  The implication is that it's best to not run multiple sets of polling jobs:
> When the SDK is instantiated, it kicks off background jobs to update an in-memory cache with small amounts of data fetched from Split servers.
*/
const createSplitClientLock = new AsyncLock()
let splitClient: SplitIO.IClient | undefined

export async function getSplitClient(): Promise<SplitIO.IClient> {
  return createSplitClientLock.acquire('splitClient', async () => {
    if (splitClient) {
      return splitClient
    }


    splitClient = SplitFactory(
      {
        core: {
          authorizationKey: 'localhost',
        },
        features: 'split.yaml',
        scheduler: {
          offlineRefreshRate: -1,
        },
      }
    ).client()

    // we only care about this event one time per app instance boot
    // so using this promise wrapper simplifies the flow
    await pEvent(splitClient, splitClient.Event.SDK_READY)

    return splitClient
  })
}

export async function destroySplitClient(): Promise<void> {
  await splitClient?.destroy()
}
