export interface IPasswordProvider {
	generateHash(params: { password: string }): Promise<string>;
	comparePassword(params: { password: string; hash: string }): Promise<boolean>;
}
