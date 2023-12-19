import { BaseResourceModel } from "./base-resource.model";
import { NutritionalInfo } from "./nutritional-info.model";

export class Food extends BaseResourceModel {

  constructor(
    public override id?: string,
    public name?: string,
    public category?: string,
    public nutritionalInfo?: NutritionalInfo
  ) {
    super();
  }

  static fromJson(jsonData: any): Food {
    return Object.assign(new Food(), jsonData);
  }
}
