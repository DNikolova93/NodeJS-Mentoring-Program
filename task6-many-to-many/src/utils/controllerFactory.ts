export class ControllersFactory {
  public controllers: any;
  public data: object;
  public logger: any;

  constructor(controllers: any, data: object, logger: any) {
    this.controllers = controllers;
    this.data = data;
    this.logger = logger;
  }

  getUserController() {
    return new this.controllers.UserController(this.data);
  }

  getGroupController() {
    return new this.controllers.GroupController(this.data);
  }
}