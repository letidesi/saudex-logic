import { AppError } from "apperror";
import { IAdministrators } from "../../repository/administrators.model";
import { IAdministratorsRepository } from "../../repository/administrators.repository";
import {
  IAdministratorReadOneDTO,
  IAdministratorReadOneResponse,
} from "./administrator.readOne.DTO";

/**
 * Get one administrator
 */
export class AdministratorReadOneUseCase {
  /**
   * Constructor for ReadOneAdministratorUseCase
   * @param administratorRepository - The {@link IAdministratorRepository}
   */
  constructor(private administratorRepository: IAdministratorsRepository) {}

  /**
   * @param dto - {@link IAdministratorExistsDTO}
   * @returns The Administrator
   */
  async exec(
    dto: IAdministratorReadOneDTO
  ): Promise<IAdministratorReadOneResponse> {
    const { administratorId, email } = dto;

    if (!administratorId && !email) {
      throw new AppError({
        message: 'Parameters "id" and "email" where not provided.',
        ptMessage: 'Os parâmetros "id" e "email" não foram fornecidos.',
      });
    }

    let administrator: IAdministrators | null = null;

    if (email)
      administrator = await this.administratorRepository.readOneByEmail({
        email,
      });
    if (administratorId)
      administrator = await this.administratorRepository.readOne({
        administratorId,
      });

    if (!administrator) {
      throw new AppError({
        message: "The Administrator couldn't be found.",
        ptMessage: "O administrador não pôde ser encontrado.",
      });
    }

    return administrator;
  }
}
