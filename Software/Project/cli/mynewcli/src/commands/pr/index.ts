import {Command, flags} from '@oclif/command'

export default class Hello extends Command {
  static description = '查看和增添pr信息';

  static examples = [
    `$ mynewcli hello
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  };

  static args = [
    {
      name: 'PR',
      description: '添加第二个参数list / add 来展示/增添 pr 功能',
    },
    {
      name: 'prOperation',
      description: 'list / add 来展示/增添pr 功能',
    },
  ];

  async run() {
    const {argv, flags} = this.parse(Hello)
    // 如果有argv的话
    if (argv.length === 0) {
      // 执行一大堆活动
    }
    console.log(argv.length)
    console.log(`running my command with args: ${argv[0]}, ${argv[1]}`)
    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
  }
}
