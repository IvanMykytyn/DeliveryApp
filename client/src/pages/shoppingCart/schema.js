import * as yup from 'yup'

// validate if a string contains only digits
yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only')
})

// validate if a string consist of letters
yup.addMethod(yup.string, 'lettersOnly', function () {
  const errorMessage = 'The Name must contain only letters'
  return this.test('testLettersOnly', errorMessage, function (value) {
    return !/[^a-z]/i.test(value)
  })
})

export const orderSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .lettersOnly(),
  email: yup.string().required('Required').email('Invalid email'),
  phone: yup
    .string()
    .required('Required')
    .min(8, 'Too Short!')
    .max(15, 'Too Long!')
    .integer(),
  address: yup
    .string()
    .required('Required')
    .min(4, 'Too Short!')
    .max(60, 'Too Long!'),
})
