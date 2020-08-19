import {Command} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class Hello extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ mynewcli
      please choose a area:
        fix: fix a area
    `,
  ];

  async run() {
    const {argv, flags} = this.parse(Hello)
    // 如果有argv的话
    const responses: any = await inquirer.prompt([
      {
        name: 'stage',
        message: 'select a stage',
        type: 'list',
        choices: [
          {name: 'development'},
          {name: 'staging'},
          {name: 'production'},
        ],
      },
      {
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
          {
            name: 'custom',
          },
          {
            name: 'Ham',
          },
          {
            name: 'Ground Meat',
          },
          {
            name: 'Bacon',
          },
          {
            name: 'Mozzarella',
          },
          {
            name: 'Cheddar',
          },
          {
            name: 'Parmesan',
          },
          {
            name: 'Mushroom',
          },
          {
            name: 'Tomato',
          },
          {
            name: 'Pineapple',
          },
          {
            name: 'Extra cheese',
          },
        ],
        validate: async function (answer: string[]) {
          if (answer.length === 0) {
            return 'You must choose at least one topping.'
          }
          return true
        },
      },
    ])
    if (responses.toppings.includes('custom')) {
      // 执行一段内容， 包含pr
      responses.toppings = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Select toppings',
        },
      ])
    }
    this.log(`the stage is: ${responses.toppings[0]}`)
    console.log(argv.length)
    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
  }
}
