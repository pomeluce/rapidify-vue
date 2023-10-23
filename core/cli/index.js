#!/usr/bin/env node

import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import figlet from 'figlet';
import fs from 'fs-extra';
import { createSpinner } from 'nanospinner';
import { download } from 'obtain-git-repo';

const customGradient = gradient(['#f6d365', '#d4fc79', '#96e6a1', '#8fd3f4', '#fda085']);

const run = async () => {
  figlet('rapidify vue', async (_, data) => {
    console.log(customGradient.multiline(data));
    console.log(chalk.cyanBright(`\n 欢迎使用 rapidify-vue 前端脚手架 \n 了解更多请访问: https://github.com/pomeluce/rapidify-vue\n`));

    const info = await inquirer.prompt({
      name: 'dirname',
      type: 'input',
      message: '请输入项目名称: ',
      default() {
        return 'rapidify-vue';
      },
    });

    const isExist = fs.existsSync(info.dirname);

    if (isExist) {
      console.log(chalk.redBright(`\n 当前目录已存在 ${info.dirname} 目录, 请更换名称或切换目录后重试!`));
    } else {
      const spinner = createSpinner('pulling project template to create project, please wait a moment').start();

      download('direct:https://github.com/pomeluce/rapidify-vue.git#main', info.dirname, { clone: true }, err => {
        if (err) {
          spinner.error({ text: '项目创建失败, 请检查网络连接后重试' });
        } else {
          fs.removeSync(`${info.dirname}/.git`);
          fs.removeSync(`${info.dirname}/.gitignore`);
          const pkg = fs.readJsonSync(`${info.dirname}/package.json`);
          pkg.name = info.dirname;
          fs.writeFileSync(`${info.dirname}/package.json`, JSON.stringify(pkg, null, 2));
          spinner.success({ text: '项目创建成功, 请依次执行以下命令\n' });
          console.log(chalk.cyanBright(` cd ${info.dirname}\n`));
          console.log(chalk.cyanBright(' npm/pnpm/yarn install\n'));
          console.log(chalk.cyanBright(' npm/pnpm/yarn run dev'));
        }
      });
    }
  });
};

run();
