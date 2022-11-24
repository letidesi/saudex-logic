export type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

export type ModifyAllType<T, R> = Record<keyof T, R>;

export interface IReadListDTO {
	page?: number;
	regsPerPage?: number;
}
