var fs = require('fs');
var dir = require('node-dir');

function rdir() {
  return new Promise((res, rej) => {
    dir.readFiles(
      './',
      {
        exclude: /^(.DS_Store|.babelrc|.gitignore|README.md|package.json|yarn.lock|server.js|buildMarkdown.js|webpack.config.js)$/,
        excludeDir: /^(node_modules|.git|dist|src|.vscode|BashCLI|public)$/
      },
      function(err, content, filenames, next) {
        if (err) return rej(err);
        next();
      },
      function(err, files) {
        if (err) return rej(err);
        return res(files);
      }
    );
  });
}

async function aggregateMarkdown() {
  var initial = {
    guides: {
      crossPlatform: {},
      native: {},
      server: {},
      tooling: {},
      web: {}
    },
    documentation: {
      crossPlatform: {},
      native: {},
      server: {},
      tooling: {},
      web: {}
    },
    talksAndSlides: {
      crossPlatform: {},
      native: {},
      server: {},
      tooling: {},
      web: {}
    }
  };

  var files = await rdir();

  return [
    files.reduce(
      (acc, curr, index) => {
        console.log(acc, curr, index);
        var path = curr.split('/');
        acc[path[0]][path[1]][path[2]] = files.reduce(
          (acc, curr) => {
            var split = curr.split('/');
            if (
              `${split[0]}/${split[1]}/${split[2]}` ===
              `${path[0]}/${path[1]}/${path[2]}`
            ) {
              acc[split[split.length - 1].slice(0, -3)] = curr;
              return acc;
            }
            return acc;
          },
          {}
        );
        return acc;
      },
      initial
    ),
    files
  ];
}

aggregateMarkdown().then(
  aggregated => {
    fs.writeFile(
      'src/markdown.js',
      'var mdpath = ' +
        JSON.stringify(aggregated[0], null, 2) +
        '; \n export default mdpath',
      function(err) {
        if (err) {
          return console.log(err);
        }
        return console.log('📝 MARKDOWN WRITTEN');
      }
    );
    fs.writeFile(
      'src/swm.js',
      'var mdpath = ' +
        JSON.stringify(aggregated[1], null, 2) +
        '; \n exports.markdown = mdpath',
      function(err) {
        if (err) {
          return console.log(err);
        }
        return console.log('📝 MARKDOWN WRITTEN');
      }
    );
  },
  err => console.log(err)
);
