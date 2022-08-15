import * as yup from 'yup'

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only')
})

export const orderSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  phone: yup
    .string()
    .integer()
    .min(8, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  address: yup
    .string()
    .min(4, 'Too Short!')
    .max(60, 'Too Long!')
    .required('Required'),
})
