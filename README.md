# Split.io Node SDK Problem Reproduction

### Setup
Clone the repository and install dependencies with `npm install`.

### Run tests
Run tests with `npm test`.

### See the problem - tests don't exit after completing
The tests should pass and exit normally. However, if you comment out the `destroySplitClient()` line (or the whole `afterAll` call) in the test and run the tests again they won't exit.
