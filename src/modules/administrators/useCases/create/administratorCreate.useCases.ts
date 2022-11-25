import { AppError } from "apperror";
import { IPasswordProvider } from "../../../../config/providers/crypto";
import { IAdministrators } from "../../repository/administrators.model";
import { IAdministratorsRepository } from "../../repository/administrators.repository";
import {
  IAdministratorCreateDTO,
  IAdministratorCreateResponse,
} from "./administratorCreate.DTO";

/**
 * Creates a new administrator
 */
export class AdministratorCreateUseCase {
  /**
   * Constructor for AdministratorCreateUseCase
   * @param administratorsRepository - Inject a {@link IFormRepository} implementation
   */
  constructor(
    private administratorsRepository: IAdministratorsRepository,
    private passwordProvider: IPasswordProvider
  ) {}

  /**
   * @param dto - {@link IAdministratorsCreateDTO}
   * @returns The created administratorsCreateUseCase
   */
  async exec(
    dto: IAdministratorCreateDTO
  ): Promise<IAdministratorCreateResponse> {
    const { name, email, password, confirmPassword, termsOfUse } = dto;
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

    if (password != confirmPassword) {
      throw new AppError({
        message: "The passwords are not the same.",
        ptMessage: "As senhas não são iguais.",
      });
    }

    if (!termsOfUse) {
      throw new AppError({
        message: 'Parameter "termsOfUse" was not provided.',
        ptMessage: 'O parâmetro "termsOfUse" não foi fornecido.',
      });
    }

    const administratorAlreadyExists =
      await this.administratorsRepository.readOneByEmail({ email });
    if (administratorAlreadyExists) {
      throw new AppError({
        message: "An administrator with the specified e-mail already exists.",
        ptMessage: "Já existe um administrador com o e-mail especificado.",
      });
    }

    const hash = await this.passwordProvider.generateHash({ password });

    const createdAdministrators: IAdministrators =
      await this.administratorsRepository.create({
        administrators: {
          name,
          email,
          password: hash,
          confirmPassword,
          termsOfUse,
        },
      });

    return createdAdministrators;
  }
}
