import * as yup from 'yup';

export const fields = [
    'id',
    'postId',
    'name',
    'email'
] as const;
export const schema = yup.object({
    id: yup.number().required('Обязательное поле'),
    postId: yup.number().required('Обязательное поле'),
    name: yup.string().required('Обязательное поле'),
    email: yup.string().email().required('Обязательное поле'),
/*     phone: yup.string().required('Обязательное поле')
        .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, 'Некорректный номер') */
});
export interface Line {
    id: number,
    postId: number,
    name: string,
    email: string
}
export const searchs = [
    'id',
    'name'
] as const;
export const url = 'https://jsonplaceholder.typicode.com/comments';