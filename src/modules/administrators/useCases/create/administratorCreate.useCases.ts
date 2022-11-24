import { AppError } from 'apperror';
import { IAdministrators } from '../../repository/administrators.model';
import { IAdministratorsRepository } from '../../repository/administrators.repository';
import { IAdministratorCreateDTO, IAdministratorCreateResponse } from './administratorCreate.DTO';

/**
 * Creates a new administrator
 */
export class AdministratorCreateUseCase {
	/**
	 * Constructor for AdministratorCreateUseCase
	 * @param administratorsRepository - Inject a {@link IFormRepository} implementation
	 */
	constructor(private administratorsRepository: IAdministratorsRepository) {}

	/**
	 * @param dto - {@link IAdministratorsCreateDTO}
	 * @returns The created administratorsCreateUseCase
	 */
	async exec(dto: IAdministratorCreateDTO): Promise<IAdministratorCreateResponse> {
		const { name, email, password, termsOfUse } = dto;
		if (!name) {
			throw new AppError({
				message: 'Parameter "name" was not provided.',
				ptMessage: 'O parâmetro "name" não foi fornecido.',
			});
		}

        if (!email) {
			throw new AppError({
				message: 'Parameter "email" was not provided.',
				ptMessage: 'O parâmetro "email" não foi fornecido.',
			});
		}
        
        if (!password) {
			throw new AppError({
				message: 'Parameter "password" was not provided.',
				ptMessage: 'O parâmetro "password" não foi fornecido.',
			});
		}

        if (!termsOfUse) {
			throw new AppError({
				message: 'Parameter "termsOfUse" was not provided.',
				ptMessage: 'O parâmetro "termsOfUse" não foi fornecido.',
			});
		}

		const createdAdministrators: IAdministrators = await this.administratorsRepository.create({
			administrators: {
				name,
				email,
				password,
                termsOfUse,
			},
		});

		return createdAdministrators;
	}
}
