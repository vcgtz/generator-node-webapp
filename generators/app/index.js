const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    this.log(yosay('Welcome to the Node Web App generator!'));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's the name of your package?",
        default: this.appname,
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: "What's the description of your project?",
        default: '',
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true,
      },
    ]);
  }

  async writing() {
    const folderName = this.answers.projectName
      .replace(/\s/g, '-')
      .toLowerCase();
    const folderPath = path.resolve(this.destinationPath(), folderName);

    this.destinationRoot(folderPath);
    this.env.cwd = this.destinationPath();

    this._setConfigFiles();
    this._setProjectFiles();
  }

  install() {
    this.env.options.nodePackageManager = 'npm';
  }

  async end() {
    if (this.answers.gitInit) {
      this.spawnCommand('git', ['init', '--quiet', '--initial-branch=main']);
    }

    this.log('');
    this.log(
      `Your new awesome project ${this.answers.projectName} has been created!`
    );
    this.log('');
  }

  _setConfigFiles() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription,
      }
    );

    this.fs.copyTpl(
      this.templatePath('eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copyTpl(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('prettierrc'),
      this.destinationPath('.prettierrc')
    );

    this.fs.copyTpl(
      this.templatePath('tailwind.config.js'),
      this.destinationPath('tailwind.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
  }

  _setProjectFiles() {
    this.fs.copyTpl(
      this.templatePath('index.ts'),
      this.destinationPath('index.ts')
    );

    this.fs.copyTpl(
      this.templatePath('controllers/Controller.ts'),
      this.destinationPath('src/controllers/Controller.ts')
    );

    this.fs.copyTpl(
      this.templatePath('controllers/HomeController.ts'),
      this.destinationPath('src/controllers/HomeController.ts')
    );

    this.fs.copyTpl(
      this.templatePath('public/css/tailwind.css'),
      this.destinationPath('src/public/css/tailwind.css')
    );

    this.fs.copyTpl(
      this.templatePath('routes/Router.ts'),
      this.destinationPath('src/routes/Router.ts')
    );

    this.fs.copyTpl(
      this.templatePath('routes/HomeRouter.ts'),
      this.destinationPath('src/routes/HomeRouter.ts')
    );

    this.fs.copyTpl(
      this.templatePath('views/home/index.hbs'),
      this.destinationPath('src/views/home/index.hbs')
    );
  }
};
