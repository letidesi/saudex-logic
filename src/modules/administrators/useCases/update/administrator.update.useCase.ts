import { AppError } from "apperror";
import { IAdministratorsRepository } from "../../repository/administrators.repository";
import {
  IAdministratorUpdateDTO,
  IAdministratorUpdateResponse,
} from "./administrator.update.DTO";

/**
 * Updates any administrator property, should be admin
 */
export class AdministratorUpdateUseCase {
  /**
   * Contructor for AdministratorUpdateUseCase
   * @param administratorsRepository - The {@link IadministratorRepository}
   */
  constructor(private administratorsRepository: IAdministratorsRepository) {}

  /**
   * @param dto - {@link IadministratorMailActivationDTO}
   * @returns The updated administrator
   */
  async exec(
    dto: IAdministratorUpdateDTO
  ): Promise<IAdministratorUpdateResponse> {
    const { administrator } = dto;

    if (!administrator) {
      throw new AppError({
        message: 'Parameter "administrator" was not provided.',
        ptMessage: 'O parâmetro "administrator" não foi fornecido.',
      });
    }

    const ret = await this.administratorsRepository.update({ administrator });
    if (!ret) {
      throw new AppError({
        message: "administrator not found.",
        ptMessage: "O usuário não foi encontrado.",
      });
    }

    return ret;
  }
}
