const {app, BrowserWindow} = require('electron');
const path = require('path');
const child_process = require('child_process');
var mypython;
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
  mainWindow.loadFile('src/assets/scripts/templates/home.html')
}

app.whenReady().then(() => 
{
  
  // ////////////////////////////// Spawn  here /////////////////////////////////
  var spawn = require("child_process").spawn;
  mypython = spawn('python',["./src/assets/scripts/app.py"]);
  mypython.stdout.on('data', function (data) 
  {
    console.log("data: ", data.toString('utf8'));
  });
  mypython.stderr.on('data', (data) => 
  {
    console.log(`stderr: ${data}`); // when error
  });
  // ////////////////////////////// Spawn end here /////////////////////////////////
  // setTimeout(()=>
  // mypython.kill(9),30000)

  ////////////////////////////// Exec here /////////////////////////////////
  // let backend;
  // backend = path.join(process.cwd(), 'src/assets/dist/app')
  
  // mypython = child_process.execFile(
  // backend,
  // (err, stdout, stderr) => {
  //   if (err) {
  //   console.log(err);
  //   }
  //   if (stdout) {
  //   console.log(stdout);
  //   }
  //   if (stderr) {
  //   console.log(stderr);
  //   }
  // }
  // )
  ////////////////////////////// to  here /////////////////////////////////
  // setInterval(()=> 
  // {console.log("alive : ",mypython.killed);
  // console.log("pid : ",mypython.pid)},
  // 2000)
  // setTimeout(()=>
  // process.kill(mypython.pid),20000)

  // setInterval(()=> 
  // console.log("alive : ",mypython.killed),
  // 2000)
  // setTimeout(()=>
  // mypython.kill(9),20000)

  createWindow()
  app.on('activate', function () 
  {  
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
  mypython.kill(2) // Spawn py kill
})
