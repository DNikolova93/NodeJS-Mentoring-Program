export class ControllersFactory {
  public controllers: any;
  public data: object;
  public logger: any;
  public config: any;

  constructor(controllers: any, data: object, logger: any, config: any) {
    this.controllers = controllers;
    this.data = data;
    this.logger = logger;
    this.config = config;
  }

  getUserController() {
    return new this.controllers.UserController(this.data);
  }

  getGroupController() {
    return new this.controllers.GroupController(this.data);
  }

  getErrorController() {
    return new this.controllers.ErrorController(this.logger);
  }

  getAuthController() {
    return new this.controllers.ErrorController(this.data, this.config);
  }
}
