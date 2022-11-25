import { AppError } from "apperror";
import { IAdministratorsRepository } from "../../repository/administrators.repository";
import {
  IAdministratorDeleteDTO,
  IAdministratorDeleteResponse,
} from "./administrator.delete.DTO";

/**
 * Deletes an administrator
 */
export class AdministratorDeleteUseCase {
  /**
   * Constructor for the AdministratorDeleteUseCase
   * @param administratorRepository - The {@link IAdministratorRepository}
   */
  constructor(private administratorRepository: IAdministratorsRepository) {}

  /**
   * @param dto - {@link IAdministratorDeleteDTO}
   */
  async exec(
    dto: IAdministratorDeleteDTO
  ): Promise<IAdministratorDeleteResponse> {
    const { administratorId, confirmation } = dto;
		if (!administratorId) {
			throw new AppError({
				message: 'Parameter "administratorId" wasn\'t provided.',
				ptMessage: 'O parâmetro "administratorId" não foi fornecido.',
			});
		}
		if (confirmation !== 'deletar') {
			throw new AppError({
				message: 'The pass word "confirmation" is incorrect.',
				ptMessage: 'A palavra passe "confirmação" está incorreta.',
			});
		}

    await this.administratorRepository.delete({ administratorId });

  }
}
