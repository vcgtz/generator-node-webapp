const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('Testing project generation', () => {
  it('generate a full node project', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'myproject',
        projectDescription: 'My JS project description',
        db: 'mongo',
        gitInit: false,
      })
      .then(() => {
        assert.file('myproject/index.ts');
        assert.file('myproject/src/controllers/HomeController.ts');
        assert.file('myproject/src/routes/HomeRouter.ts');

        done();
      })
      .catch(e => done(e));;
    }
  );
});
