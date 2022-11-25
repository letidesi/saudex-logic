import { AppError } from "apperror";
import { IAdministrators } from "../../../modules/administrators";
import { AdministratorUpdateUseCase } from "../../../modules/administrators/useCases/update/administrator.update.UseCase";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";

function createSUT() {
	const administratorService = new AdministratorsServiceMock();
	const sut = new AdministratorUpdateUseCase(administratorService);

	return sut;
}


describe('Must update any administrator data on service', () => {
	const sut = createSUT();

	describe('Given valid administrator and change the email', () => {
		const administratorRepoMock = administratorsMockList[0];

		it('should be able to update the email of originaladministrator', async () => {
			const newEmail = 'new@email.com';
			const newadministratorInstance: IAdministrators = JSON.parse(JSON.stringify(administratorRepoMock));
			newadministratorInstance.email = newEmail;

			const ret = await sut.exec({ administrator: newadministratorInstance });
			const repoadministrator = administratorsMockList[0];

			expect(ret).not.toBeNull();
			expect(ret!.email).toBe(newEmail);
			expect(ret).toBe(repoadministrator); // check if ret correspond to repo administrator
		});

	});

	describe('Given valid administrator and change id to non-existing', () => {
		const administratorRepoMock = administratorsMockList[0];

		it('should throw an instance of AppError saying \'O administrador não foi encontrado.\' on ptMessage', async () => {
			try {
				const newId = 'non-existing-id';
				const newadministratorInstance: IAdministrators = JSON.parse(JSON.stringify(administratorRepoMock));
				newadministratorInstance._id = newId;

				const ret = await sut.exec({ administrator: newadministratorInstance });

				expect(ret).toBe(undefined);
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O administrador não foi encontrado.');
			}
		});

	});

	describe('Given empty administrator as parameter', () => {
		it('should throw an instance of AppError saying \'O parâmetro \"administrator\" não foi fornecido.\' on ptMessage', async () => {
			try {
				const ret = await sut.exec({ administrator: undefined });
				expect(ret).toBe(undefined);
			} catch (error: unknown) {
				expect(error).toBeInstanceOf(Error);
				expect(error).toHaveProperty('ptMessage');
				expect((error as AppError).ptMessage).toBe('O parâmetro \"administrator\" não foi fornecido.');
			}
		});
	});

});
