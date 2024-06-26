import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
});