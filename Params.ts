import { ActionArgsDefinition, EArgsType } from "./model.ts";
export const Params = (routeKey: string): any =>
  (
    target: any,
    propertyKey: string,
    parameterIndex: number,
  ): void => {
    // set default if none exists
    if (!Reflect.has(target.constructor, "params")) {
      Reflect.defineProperty(target.constructor, "params", {
        value: new Map<string, ActionArgsDefinition[]>(),
      });
    }

    // Retreive whole map from Class metadata
    const params: Map<string, ActionArgsDefinition[]> = Reflect.get(
      target.constructor,
      "params",
    );

    // retreive array of params corresponding to
    // controller action name
    const controllerActionParams: ActionArgsDefinition[] =
      params.get(propertyKey) || [];

    // push new ParamsDefinition into the appropriate
    // controller action
    controllerActionParams.push({
      type: EArgsType.PARAMS,
      key: routeKey,
      index: parameterIndex,
    });
    // set map value to new array, and then update
    // metadata value to new map
    params.set(propertyKey, controllerActionParams);
    Reflect.defineProperty(target.constructor, "params", {
      value: params,
    });
  };
