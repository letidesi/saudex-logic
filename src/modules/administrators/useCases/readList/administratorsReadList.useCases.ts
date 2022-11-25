import { AppError } from "apperror";
import { IAdministrators } from "../../repository/administrators.model";
import {
  IAdministratorsReadListParamsPagination,
  IAdministratorsRepository,
} from "../../repository/administrators.repository";
import {
  IAdministratorsReadListDTO,
  IAdministratorsReadListResponse,
} from "./administratorsReadList.DTO";

/**
 * Retrieves a list of administrators based on the parameters provided
 */
export class AdministratorsReadListUseCase {
  /**
   * @param administratorsRepository - Inject a {@link IAdministratorsRepository} implementation
   */
  constructor(private administratorsRepository: IAdministratorsRepository) {}
  /**
   * @param dto - {@link IAdministratorsReadListDTO}
   * @returns A object with the list (paginated)
   */
  async exec(
    dto: IAdministratorsReadListDTO
  ): Promise<IAdministratorsReadListResponse> {
    const { query, page, regsPerPage } = dto;

    const parameters: IAdministratorsReadListParamsPagination = {
      query: query,
      page,
      regsPerPage,
    };

    const list: Array<IAdministrators> =
      await this.administratorsRepository.readList(parameters);
    const count: number = await this.administratorsRepository.readListCount(
      parameters
    );

    return {
      list,
      count,
    };
  }
}
