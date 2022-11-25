import { string } from "yargs";
import { ESortOrientation } from "../../../../config/enums/administrators/administrators";
import { IReadListDTO } from "../../../../global/global.interfaces";
import { IAdministrators } from "../../repository/administrators.model";

export interface IAdministratorsReadListDTO extends IReadListDTO {
  query?: string;
}

export interface IAdministratorsReadListResponse {
  list: Array<IAdministrators>;
  count: number;
}
