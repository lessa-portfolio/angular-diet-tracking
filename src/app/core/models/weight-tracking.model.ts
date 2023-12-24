import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class WeightTracking extends BaseResourceModel {

  constructor(
    public override id?: string,
    public date?: Date,
    public value?: number
  ) {
    super();
  }

  static fromJson(jsonData: any): WeightTracking {
    return Object.assign(new WeightTracking(), jsonData);
  }
}
