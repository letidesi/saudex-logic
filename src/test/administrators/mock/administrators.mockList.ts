import { IAdministrators } from "../../../modules/administrators";

export let administratorsMockList: Array<IAdministrators> = [{
    _id: 'administrators_id',
    name: 'name_admin',
    email: 'email@example.com',
    password: '111111',
    termsOfUse: 'example terms of use'
}, {
    _id: 'administrators_new_id',
    name: 'name_new_admin',
    email: 'email2@example.com',
    password: '1235',
    termsOfUse: 'new example terms of use'
}]