#!/usr/bin/env node

const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');

const pkg = require('./package.json');

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
                type: 'checkbox',
                name: 'options',
                message: 'options:',
                choices: [
                    {
                        name: 'react'
                    }
                ]
            }
        ])
        .then(answers => {
            fs.ensureDirSync(projectName);
            fs.writeFileSync(
                path.join(root, 'package.json'),
                JSON.stringify({
                    ...packageJson,
                    name: answers.name,
                    version: answers.version,
                    description: answers.description
                }, null, 2) + os.EOL
            );

            install(root, getDependencies(answers.options))
                .then(() => {})
                .catch(error => {
                    console.error(chalk.red('Something went wrong during install:'));
                    console.error(error);
                    process.exit(1);
                })
                .finally(() => {
                    console.log(
                        `${love}  ${chalk.green(chalk.bold(
                            `cd ${appName} && yarn start`
                        ))} to begin.`
                    );
                    console.log(
                        `${magic}  Use ${chalk.bold('yarn run info')} for more helpful scripts.`
                    );
                    process.exit(0);
                });
        });
})('👍', '💡');

function install(root, dependencies) {
    return new Promise((resolve, reject) => {
        const args = [];

        args.push('add', '--exact', ...dependencies, '--cwd', root);

        const child = spawn('yarn', args, { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
                reject({ command: `yarn ${args.join(' ')}` });
                return;
            }

            resolve();
        });
    });
}

function getDependencies(options) {
    const dependencies = [
        '@types/node',
        '@lapidist/safestart-scripts',
        'typescript'
    ];

    if (options.indexOf('react') > -1) {
        dependencies.push(
            '@types/react',
            '@types/react-dom',
            'react',
            'react-dom'
        );
    }

    console.log(dependencies);

    return dependencies;
}
