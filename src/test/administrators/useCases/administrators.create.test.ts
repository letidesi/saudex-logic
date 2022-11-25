
import { AppError } from "AppError";
import { IAdministratorCreateDTO } from "../../../modules/administrators/useCases/create/administratorCreate.DTO";
import { AdministratorCreateUseCase } from "../../../modules/administrators/useCases/create/administratorCreate.useCases";
import { MockPasswordProvider } from "../../providers/password.provider.mock";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";


function createSUT(): {
	sut: AdministratorCreateUseCase;
	administratorsServiceMock: AdministratorsServiceMock;
} {
	const administratorsServiceMock = new AdministratorsServiceMock();
	const mockPasswordProvider = new MockPasswordProvider();
	const administratorsCreateUseCase = new AdministratorCreateUseCase(administratorsServiceMock, mockPasswordProvider);

	return {
		sut: administratorsCreateUseCase,
		administratorsServiceMock,
	};
}

describe('Administrator Create', () => {
	const { sut, administratorsServiceMock: administratorsServiceMock } = createSUT();

	const name = administratorsMockList[0].name;
	const email = administratorsMockList[0].email;
	const password = administratorsMockList[0].password;
	const confirmPassword = administratorsMockList[0].confirmPassword;
	const termsOfUse = administratorsMockList[0].termsOfUse;

	describe('Given the correct parameters', () => {

		it('should create a new administrator', async () => {
			const dto: IAdministratorCreateDTO = { name: name, email: 'test2@exemplo.com.br', password: password, confirmPassword: confirmPassword, termsOfUse: termsOfUse };

			const createdAdministrators = await sut.exec(dto);

			expect(administratorsServiceMock.create).toHaveBeenCalled();
			expect(createdAdministrators).toBeTruthy();
			expect(createdAdministrators._id).toBeTruthy();
			expect(createdAdministrators.name).toEqual(name);
			expect(createdAdministrators.email).toBeTruthy();
			expect(createdAdministrators.password).toEqual(password);
			expect(createdAdministrators.confirmPassword).toEqual(password);
			expect(createdAdministrators.termsOfUse).toEqual(termsOfUse);
		});

	});

	describe('Given email that already exists on repository', () => {
		const administratorRepoMock = administratorsMockList[0];

		it("should throw an instance of AppError saying 'Já existe um administrador com o e-mail especificado.' on ptMessage", async () => {
			try {
				const ret = await sut.exec({
					email: administratorRepoMock.email,
					name: name, 
				    password: password,
					confirmPassword: confirmPassword, 
					termsOfUse: termsOfUse
				});
				expect(ret).toBe(undefined);
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('Já existe um administrador com o e-mail especificado.');
			}
		});
	});

	describe('Given missing parameter name', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorCreateDTO = { name: '', email: email, password: password, confirmPassword: confirmPassword, termsOfUse: termsOfUse};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as  AppError).ptMessage).toBe('O parâmetro "name" não foi fornecido.');
			}
		});
	});

	describe('Given missing parameter email', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorCreateDTO = { name: name, email: '', password: password, confirmPassword: confirmPassword, termsOfUse: termsOfUse};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O parâmetro "email" não foi fornecido.');
			}
		});
	});

	describe('Given missing parameter password', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorCreateDTO = { name: name, email: email, password: '',  confirmPassword: confirmPassword, termsOfUse: termsOfUse};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O parâmetro "password" não foi fornecido.');
			}
		});
	});

	describe('Given missing parameter terms of use', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorCreateDTO = { name: name, email: email, password: password, confirmPassword: confirmPassword, termsOfUse: ''};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O parâmetro "termsOfUse" não foi fornecido.');
			}
		});
	});

	describe('should give an error if the password is different from the password confirmation', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorCreateDTO = { name: name, email: email, password: password, confirmPassword: 'test', termsOfUse: termsOfUse};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('As senhas não são iguais.');
			}
		});
	});
});
