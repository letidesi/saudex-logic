import { IAdministrators, IAdministratorsCreate, IAdministratorsRepository } from "../../../modules/administrators";
import { administratorsMockList } from "./administrators.mockList";

export class AdministratorsServiceMock implements IAdministratorsRepository  {
    create = jest.fn().mockImplementation(async (params: { administrators: IAdministratorsCreate }): Promise<IAdministrators> => {
        const { administrators } = params;
		const { name, email, password, termsOfUse } = administrators;
		const newAdministrators: IAdministrators = {
			_id: 'new_id',
			name,
			email,
            password,
            termsOfUse
		};
		return newAdministrators;
	});

}