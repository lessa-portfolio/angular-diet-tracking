import { BaseResourceModel } from "../../shared/models/base-resource.model";

export class NutritionalInfo extends BaseResourceModel {

  constructor(
    public override id?: string,
    public calories?: number,
    public carbohydrates?: number,
    public proteins?: number,
    public fats?: number,
    public fibers?: number,
  ) {
    super();
  }

  static fromJson(jsonData: any): NutritionalInfo {
    return Object.assign(new NutritionalInfo(), jsonData);
  }
}
