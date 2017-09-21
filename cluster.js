const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();

console.log('executing thread');

if (cluster.isMaster) {
  console.log('master thread');
  cpus.forEach(() => cluster.fork());

  cluster.on('listening', worker =>
    console.log(`cluster connected with id ${worker.process.pid}`)
  );

  cluster.on('exit', worker => {
    console.log(`cluster id ${worker.process.id} lost connection`);
    console.log('connecting new cluster');
    cluster.fork()
  })
}else {
  console.log('slave thread');
  require('./app.js')
}
