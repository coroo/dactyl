import { Application as OakApplication } from "./deps.ts";
import { DactylRouter } from "./DactylRouter.ts";
import { ApplicationConfig } from "./types.ts";
export class Application {
  private router: DactylRouter;
  private app: OakApplication;

  public constructor(appConfig: ApplicationConfig) {
    this.router = new DactylRouter();
    this.app = new OakApplication();

    for (const controller of appConfig.controllers) {
      this.router.register(controller);
    }
    this.app.use(this.router.middleware());
  }

  public async run(port: number) {
    console.info(
      `Dactyl bootstrapped - please visit http://localhost:${port}/`
    );
    this.app.listen({ port });
  }
}