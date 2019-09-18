# safestart

[![GitHub Release](https://img.shields.io/github/release/brettdorrans/safestart.svg?style=flat)](https://github.com/brettdorrans/safestart/releases)
[![GitHub Issues](https://img.shields.io/github/issues/brettdorrans/safestart.svg?style=flat)](https://github.com/brettdorrans/safestart/issues)
[![Dependencies](https://david-dm.org/brettdorrans/safestart/status.svg?style=flat)](https://david-dm.org/brettdorrans/safestart)
[![Dev Dependencies](https://david-dm.org/brettdorrans/safestart/dev-status.svg)](https://david-dm.org/brettdorrans/safestart?type=dev)
[![Build Status](https://travis-ci.org/brettdorrans/safestart.svg?branch=master)](https://travis-ci.org/brettdorrans/safestart)

[safestart](https://brettdorrans.github.io/safestart/): A TypeScript boilerplate with testing, versioning, coverage, docs and linting set up for you.

## Quickstart

```bash
➜ npx @lapidist/safestart-cli <project-name>
➜ cd <project-name>
➜ npm run watch
```

Alternatively:
```bash
➜ npm install -g @lapidist/safestart-cli
➜ safestart <project-name>
➜ cd <project-name>
➜ npm run watch
```

### With React
First ensure Webpack is installed. In project folder:
```bash
➜ npm install --save-dev webpack webpack-cli
```
Now add React and React-DOM, along with their declaration files, as dependencies to your `package.json` file:
```bash
➜ npm install --save react react-dom
➜ npm install --save-dev @types/react @types/react-dom typescript ts-loader source-map-loader eslint-plugin-react
```

Update your `.eslintrc.js`:
```diff
   sourceType: 'module',
-  project: './tsconfig.json'
+  project: './tsconfig.json',
+  ecmaFeatures: {
+      jsx: true
+  }
```

Update your `tsconfig.json`:
```diff
{
  "compilerOptions": {
    "module": "commonjs",
+   "jsx": "react",
  }
}
```

```diff
- "include": ["src/**/*.ts", "__tests__/**/*.ts"],
+ "include": [
+       "src/**/*.ts", 
+       "__tests__/**/*.ts",
+       "src/**/*.tsx", 
+       "__tests__/**/*.tsx"
+   ],
```

Modify `index.ts` and rename to `index.tsx`:
```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Example } from './example';

ReactDOM.render(
    <Example compiler="TypeScript" framework="React" />,
    document.getElementById('example')
);
```

Modify `example.ts` and rename to `example.tsx`:
```typescript jsx
import React from 'react';

export interface ExampleProps {
    compiler: string;
    framework: string;
}

export const Example = (props: ExampleProps) => (
    <h1>
        Hello from {props.compiler} and {props.framework}!
    </h1>
);
```

## Development

Clone repository into a directory:
```bash
➜ git clone https://github.com/brettdorrans/safestart.git
```

Install dependencies:
```bash
➜ npm install
```

Find more information about `package.json` scripts:
```bash
➜ npm run info
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
```

Additional build tasks can be found in `package.json`.

## Credits and collaboration
`safestart` is maintained by [Brett Dorrans](https://github.com/brettdorrans). I welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request.

## License
`safestart` is licensed under the MIT license. See LICENSE.md for the full text.
