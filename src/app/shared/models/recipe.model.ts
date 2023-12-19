import { BaseResourceModel } from "./base-resource.model";
import { Food } from "./food.model";
import { NutritionalInfo } from "./nutritional-info.model";

export class Recipe extends BaseResourceModel {

  constructor(
    public override id?: string,
    public name?: string,
    public ingredients?: Food[],
    public nutritionalInfo?: NutritionalInfo
  ) {
    super();
  }

  static fromJson(jsonData: any): Recipe {
    return Object.assign(new Recipe(), jsonData);
  }
}
