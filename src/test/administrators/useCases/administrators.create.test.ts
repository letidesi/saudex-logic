
import { AppError } from "AppError";
import { AdministratorsCreateUseCase, IAdministratorsCreateDTO, IAdministratorsRepository } from "../../../modules/administrators";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";


function createSUT(): {
	sut: AdministratorsCreateUseCase;
	administratorsServiceMock: AdministratorsServiceMock;
} {
	const administratorsServiceMock = new AdministratorsServiceMock();
	const administratorsCreateUseCase = new AdministratorsCreateUseCase(administratorsServiceMock);

	return {
		sut: administratorsCreateUseCase,
		administratorsServiceMock,
	};
}

describe('Administrators Create', () => {
	const { sut, administratorsServiceMock: administratorsServiceMock } = createSUT();

	const name = administratorsMockList[0].name;
	const email = administratorsMockList[0].email;
	const password = administratorsMockList[0].password;
	const termsOfUse = administratorsMockList[0].termsOfUse;
	const createdAdminId = administratorsMockList[0]._id
	describe('Given the correct parameters', () => {

		it('should create a new form', async () => {
			const dto: IAdministratorsCreateDTO = { _id: createdAdminId, name: name, email: email, password: password, termsOfUse: termsOfUse };

			const createdAdministrators = await sut.exec(dto);

			expect(administratorsServiceMock.create).toHaveBeenCalled();
			expect(createdAdministrators).toBeTruthy();
			expect(createdAdministrators._id).toBeTruthy();
			expect(createdAdministrators.name).toEqual(name);
			expect(createdAdministrators.email).toEqual(email);
			expect(createdAdministrators.password).toEqual(password);
			expect(createdAdministrators.termsOfUse).toEqual(termsOfUse);
		});

	});

	describe('Given missing parameter name', () => {

		it('should throw an instance of AppError', async () => {
			try {
				const dto: IAdministratorsCreateDTO = { _id: createdAdminId, name: '', email: email, password: password, termsOfUse: termsOfUse};

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
				const dto: IAdministratorsCreateDTO = { _id: createdAdminId, name: name, email: '', password: password, termsOfUse: termsOfUse};

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
				const dto: IAdministratorsCreateDTO = { _id: createdAdminId, name: name, email: email, password: '', termsOfUse: termsOfUse};

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
				const dto: IAdministratorsCreateDTO = { _id: createdAdminId, name: name, email: email, password: password, termsOfUse: ''};

				await sut.exec(dto);
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O parâmetro "termsOfUse" não foi fornecido.');
			}
		});
	});
});
