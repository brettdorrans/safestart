# safestart

[![GitHub Release](https://img.shields.io/github/release/brettdorrans/safestart.svg?style=flat)](https://github.com/brettdorrans/safestart/releases)
[![GitHub Issues](https://img.shields.io/github/issues/brettdorrans/safestart.svg?style=flat)](https://github.com/brettdorrans/safestart/issues)
[![Dependencies](https://david-dm.org/brettdorrans/safestart/status.svg?style=flat)](https://david-dm.org/brettdorrans/safestart)
[![Build Status](https://travis-ci.org/brettdorrans/safestart.svg?branch=master)](https://travis-ci.org/brettdorrans/safestart)

[safestart](https://brettdorrans.github.io/safestart/): A TypeScript boilerplate with testing, versioning, coverage, docs and linting set up for you.

## Quickstart

Clone repository into a directory:
```bash
➜ git clone https://github.com/brettdorrans/safestart.git
```

Install dependencies:
```bash
➜ yarn
```

Find more information about `package.json` scripts:
```bash
➜ yarn run info
```
```
info:
  Display information about the package scripts
build:
  Clean and rebuild the project
fix:
  Try to automatically fix any linting problems
test:
  Lint and unit test the project
watch:
  Watch and rebuild the project on save, then rerun relevant tests
cov:
  Rebuild, run tests, then create and open the coverage report
doc:
  Generate HTML API documentation and open it in a browser
version:
  Bump package.json version, update CHANGELOG.md, tag release
reset:
  Delete all untracked files and reset the repo to the last commit
prepare-release:
  One-step: clean, build, test, publish docs, and prep a release
```

Additional build tasks can be found in `package.json`.

## Credits and collaboration
`safestart` is maintained by [Brett Dorrans](https://github.com/brettdorrans). I welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request.

## License
`safestart` is licensed under the MIT license. See LICENSE.md for the full text.