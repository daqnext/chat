import cluster from "cluster";

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = (await import('os')).cpus().length;
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {  
    cluster.fork();
  }
  // Listen for dying workers
  cluster.on('exit', function () {
    cluster.fork();
  });
} else {
    import('./main.js');
}