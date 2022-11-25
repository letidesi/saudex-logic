import { IPasswordProvider } from "../../config/providers/crypto";


export class MockPasswordProvider implements IPasswordProvider {
	generateHash = jest.fn().mockImplementation(async (params: { password: string }) => {
		const { password } = params;
		return await password;
	});

	comparePassword = jest.fn().mockImplementation(async (params: { password: string, hash: string }) => {
		const { password, hash } = params;
		return await password === hash;
	});
}
