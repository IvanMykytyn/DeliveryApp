import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(8, 'Too Short!')
    .max(25, 'Too Long!')
    .matches(passwordRules, { message: 'Password must have at least 1 uppercase, 1 lowercase character and 1 numeric digit' })
    .required('Required'),
})
