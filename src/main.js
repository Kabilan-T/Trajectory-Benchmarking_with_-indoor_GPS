const {app, BrowserWindow} = require('electron');
const path = require('path');
const child_process = require('child_process');
const { exec } = require('child_process');


function createWindow () 
{
  const mainWindow = new BrowserWindow
  ({
    width: 800,
    height: 600,
    webPreferences: 
    {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('src/assets/templates/home.html')

}


app.whenReady().then(() => 
{
  // ////////////////////////////// Exec here /////////////////////////////////
  // let backend;
  // backend = path.join(process.cwd(), 'src/assets/dist/app')
  // var exec = child_process.exec;
  // child_process.exec(
  // backend,
  // (err, stdout, stderr) => {
  //   if (err) {
  //   console.log(err);npm
  //   }
  //   if (stdout) {
  //   console.log(stdout);
  //   }
  //   if (stderr) {
  //   console.log(stderr);
  //   }
  // }
  // )
  // ////////////////////////////// to  here /////////////////////////////////

  // ////////////////////////////// Spawn  here /////////////////////////////////
  var spawn = require("child_process").spawn;
  var python = spawn('python',["./src/assets/app.py"]);
  python.stdout.on('data', function (data) 
  {
    console.log("data: ", data.toString('utf8'));
  });
  python.stderr.on('data', (data) => 
  {
    console.log(`stderr: ${data}`); // when error
  });
  // ////////////////////////////// to  here /////////////////////////////////
  
  createWindow()

  app.on('activate', function () 
  {  
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
  ////////////////////////////// Exec killing  here /////////////////////////////////
  // exec('taskkill /f /t /im app', (err, stdout, stderr) => {
  //       if (err) {
  //       console.log(err)
  //       return;
  //       }
  //       console.log(`stdout: ${stdout}`);
  //       console.log(`stderr: ${stderr}`);
  //     });
  // ////////////////////////////// to  here /////////////////////////////////
})
