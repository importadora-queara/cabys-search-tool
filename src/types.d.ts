declare module "worker-loader!*" {
  class snowpackWorker extends Worker {
    constructor();
  }

  export default snowpackWorker;
}
