var fs = require('fs');
var execSync = require('child_process').execSync;

var version_command = "git rev-list HEAD --abbrev-commit --max-count=1";

var HTMLFile = "./index.html";

var distHTML = "./template/web/index.html"

// Exec with echo
function execho(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(error.output[1]);
    process.exit(error.status);
  }
}

// Exec with return value or error
function execReturn(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(error.output[1]);
    process.exit(error.status);
  }
}

function writeAppVersion(version) {
  var htmlContent = fs.readFileSync(HTMLFile, 'utf8')
  var htmlWithVersion = htmlContent.replace(/__VERSION__/g, version)
  fs.writeFileSync(distHTML, htmlWithVersion, 'utf8');
}

var fileServer = "\\\\file.curtasoft.org\\shares\\build\\GM\\adPublish\\";

var version = execReturn(version_command).replace("\n", "");
writeAppVersion(version);
execho("copy .\\favicon.png .\\template\\web\\");
var publishResult = execReturn("egret publish");
var publishDir = publishResult.replace("Egret Engine current version: 5.0.13\nStart to publish web version: ", "").replace("\n", "");
console.log(publishDir);
execho("copy .\\bin-release\\web\\" + publishDir + "\\index.html" + " " + fileServer);
execho("copy .\\bin-release\\web\\" + publishDir + "\\main.min.js" + " " + fileServer + "libs\\");
