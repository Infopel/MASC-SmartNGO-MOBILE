import { Button } from "components/button/button"
import { Icon } from "components/icon/icon"
import * as yup from 'yup'
import { Text } from "components/text/text"
import { useFormik } from "formik"
import { observer } from "mobx-react-lite"
import { FormControl, IconButton, Input, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { useUserStore } from "store/user/user.store"
import { LoginFormStyles as styles } from "./login-form.styles"
import { isNil } from "lodash"
import { translate } from "i18n/translate"

export interface LoginFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

type UserForm = { username?: string, password?: string }

/**
 * Describe your component here
 */
export const LoginFormContainer = observer(function LoginForm(props: LoginFormProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }
  const [isHiddingPassword, setIsHiddingPassword] = React.useState(true)
  const { signIn, signInError, state } = useUserStore()
  const handleOnSubmit = (values: UserForm) => {
    signIn(values.username, values.password)
  }

  const { handleSubmit, values, errors, handleChange, handleBlur } = useFormik({
    initialValues: { username: undefined, password: undefined },
    validationSchema: yup.object().shape({ username: yup.string().min(5).required(), password: yup.string().min(6).max(32).required() }),
    onSubmit: handleOnSubmit,
  })

  return (
    <VStack space='4' testID="loginFormContainer" style={containerStyle}>
      {signInError && <Text tx={signInError} />}
      <FormControl isInvalid={!isNil(errors.username)}>
        <FormControl.Label>{translate('login.username')}</FormControl.Label>
        <Input onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} testID="email" placeholder="example@email.com"></Input>
        <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={!isNil(errors.password)}>
        <FormControl.Label>{translate('login.password')}</FormControl.Label>
        <Input onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} testID="password" placeholder="Qwerty12345@" secureTextEntry={isHiddingPassword} rightElement={<IconButton onPress={setIsHiddingPassword.bind(this, !isHiddingPassword)} colorScheme='lightText' icon={<Icon name={isHiddingPassword ? 'eye' : 'eye-off'} type="material-community" />} />}></Input>
        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
      </FormControl>
      <Button testID="loginBtn" isLoading={state === 'pending'} onPress={handleSubmit}>
        login
      </Button>
    </VStack>
  )
})
