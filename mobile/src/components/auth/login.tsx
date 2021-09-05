import * as React from 'react';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

import { authActions } from 'store';
import {
  useAppDispatch,
  useAppSelector,
  useState,
  yupResolver,
  useForm,
} from 'hooks';
import { ILogin } from 'common/interfaces';
import { loginSchema } from 'common/validations';
import { Color, RequestStatus } from 'common/enums';
import Logo from 'assets/svg/logo_dark.svg';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { signInStatus, signInError } = useAppSelector((state) => state.auth);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const passwordRef = React.useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  const onSubmit = () => {
    const { email, password } = getValues();
    dispatch(authActions.login({ email, password }));
  };

  const toggleIsPasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const onEmailSubmit = () => {
    if (passwordRef.current !== null) {
      passwordRef.current.focus();
    }
  };

  return (
    <View style={container}>
      <Logo width={300} height={90} />
      <Text style={title}>Welcome back</Text>
      <Text style={description}>Sign in to your account to continue</Text>

      <View style={formCard}>
        <View style={[formItem]}>
          <Text style={formText}>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[formInput, emailInput, errors.email && errorInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={onEmailSubmit}
                blurOnSubmit={false}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text style={errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={[formItem, passwordContainer]}>
          <Text style={formText}>Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[passwordField, errors.password && errorInput]}>
                <TextInput
                  style={[formInput, passwordInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isPasswordHidden}
                  ref={passwordRef}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
                {!!value.length && (
                  <Icon
                    name={isPasswordHidden ? 'eye' : 'eye-off'}
                    size={20}
                    color="grey"
                    onPress={toggleIsPasswordHidden}
                  />
                )}
              </View>
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text style={errorText}>{errors.password.message}</Text>
          )}
        </View>

        <Text style={[errorText, signInErrorText]}>{signInError} </Text>

        <Pressable
          style={signInButton}
          onPress={handleSubmit(onSubmit)}
          accessibilityLabel="Sign in button"
        >
          <Text style={signInText}>
            {signInStatus === RequestStatus.LOADING
              ? 'Signing in...'
              : 'Sign in'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const {
  container,
  title,
  description,
  formCard,
  formItem,
  formText,
  formInput,
  passwordContainer,
  passwordField,
  passwordInput,
  emailInput,
  signInButton,
  signInText,
  errorText,
  errorInput,
  signInErrorText,
} = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: Color.TEXT_DARK,
  },
  description: {
    fontSize: 18,
    color: Color.TEXT_DARK,
  },
  formCard: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.WHITE,
    elevation: 2,
    borderRadius: 4,
    marginTop: 40,
    padding: '5%',
  },
  formText: {
    fontSize: 16,
    color: Color.TEXT_DARK,
  },
  formItem: {
    width: '100%',
  },
  formInput: {
    width: '100%',
    height: 40,

    color: Color.TEXT_DARK,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.BORDER,
    padding: 10,
    textDecorationLine: 'none',
  },
  passwordInput: {
    width: '90%',
    borderColor: 'transparent',
    height: 40,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  passwordContainer: {
    marginTop: 20,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.BORDER,
    paddingRight: 10,
    marginTop: 5,
  },
  signInButton: {
    padding: 10,
    backgroundColor: Color.PRIMARY,
    borderRadius: 4,
  },
  signInText: {
    fontSize: 20,
    color: Color.WHITE,
  },
  errorText: {
    color: Color.DANGER,
  },
  signInErrorText: {
    marginTop: 20,
  },
  errorInput: {
    borderColor: Color.DANGER,
  },
  emailInput: {
    marginTop: 5,
  },
});
