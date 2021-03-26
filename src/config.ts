import * as yup from 'yup';

export const fields = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone'
] as const;
export const schema = yup.object({
    id: yup.number().required('Обязательное поле'),
    firstName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    email: yup.string().email().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле')
        .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, 'Некорректный номер')
});
export interface Line {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}
export const searchs = [
    'id',
    'lastName'
] as const;
export const url = 'http://www.filltext.com/?rows=502&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}';