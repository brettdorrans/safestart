#!/usr/bin/env node

const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const templates = require('@lapidist/safestart-templates');

const pkg = require('./../package.json');

let projectName;
const program = new commander.Command(pkg.name)
    .version(pkg.version)
    .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.error('Please specify the project name.');
    console.log(
        `e.g. ${chalk.cyan('safestart')} ${chalk.green('<project-name>')}`
    );
    process.exit(1);
}

(function createProjectWith(love, magic) {
    const root = path.resolve(projectName);
    const appName = path.basename(root);
    const packageJson = {
        name: appName,
        version: '1.0.0',
        private: true
    };

    if (!validateProjectName(appName).validForNewPackages) {
        console.error(
            `Unable to create ${chalk.bold(
                appName
            )} due to npm naming restrictions.`
        );
        process.exit(1);
    }

    if (fs.existsSync(projectName)) {
        console.error(
            `Unable to create ${chalk.bold(
                appName
            )}. A directory with this name already exists.`
        );
        console.error(`Move the directory or choose a different project name.`);
        // process.exit(1);
    }

    console.log(`Creating ${chalk.bold(appName)} in:\n${chalk.green(root)}`);

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `project name:`,
                default: () => packageJson.name
            },
            {
                type: 'input',
                name: 'version',
                message: `version:`,
                default: () => packageJson.version
            },
            {
                type: 'input',
                name: 'description',
                message: 'description:'
            },
            {
                type: 'list',
                name: 'stack',
                message: 'choose your stack:',
                choices: [
                    {
                        name: 'safestart'
                    },
                    {
                        name: 'safestart-react'
                    },
                    {
                        name: 'safestart-react-redux'
                    }
                ]
            }
        ])
        .then(answers => {
            if (typeof templates[answers.stack] === 'undefined') {
                console.error(
                    `Unable to create ${chalk.bold(
                        appName
                    )}. Missing @lapidist/safestart-templates entry.\nUpgrade your safestart-cli: ${chalk.bold(
                        'npm i -g @lapidist/safestart-cli'
                    )}`
                );
                process.exit(1);
            }

            const stack = templates[answers.stack];
            const {
                dependencies,
                devDependencies
            } = stack.packageJson.safestart;

            fs.ensureDirSync(projectName);
            fs.writeFileSync(
                path.join(root, 'package.json'),
                JSON.stringify(
                    {
                        ...packageJson,
                        name: answers.name,
                        version: answers.version,
                        description: answers.description,
                        main: stack.main,
                        scripts: stack.scripts,
                        'scripts-info': stack['scripts-info'],
                        engines: stack.engines
                    },
                    null,
                    2
                ) + os.EOL
            );

            install(root, dependencies, devDependencies)
                .catch(error => {
                    console.error(
                        chalk.red('Something went wrong during install:')
                    );
                    console.error(error);
                    process.exit(1);
                })
                .finally(() => {
                    console.log(
                        `${love}  ${chalk.green(
                            chalk.bold(`cd ${appName} && yarn start`)
                        )} to begin.`
                    );
                    console.log(
                        `${magic}  Use ${chalk.bold(
                            'yarn run info'
                        )} for more helpful scripts.`
                    );
                    process.exit(0);
                });
        });
})('👍', '💡');

function install(root, dependencies, devDependencies) {
    return new Promise((resolve, reject) => {
        const args = ['add', '--exact', '--cwd', root, ...dependencies];
        const devArgs = [
            'add',
            '--exact',
            '--dev',
            '--cwd',
            root,
            ...devDependencies
        ];

        if (dependencies.length) {
            const child = spawn('yarn', args, { stdio: 'inherit' });

            child.on('close', code => {
                if (code !== 0) {
                    reject({ command: `yarn ${args.join(' ')}` });
                }
            });
        }

        if (devDependencies.length) {
            const devChild = spawn('yarn', devArgs, { stdio: 'inherit' });

            devChild.on('close', code => {
                if (code !== 0) {
                    reject({ command: `yarn ${devArgs.join(' ')}` });
                    return;
                }

                resolve();
            });
        }
    });
}
