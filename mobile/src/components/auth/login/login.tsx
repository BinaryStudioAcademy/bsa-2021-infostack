import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Logo from '../../../assets/svg/logo_dark.svg';
import {
  useAppDispatch,
  useAppSelector,
  useState,
  yupResolver,
  useForm,
} from 'hooks';
import { authActions } from 'store';
import { RequestStatus } from 'common/enums';
import { ILogin } from 'common/interfaces';
import { loginSchema } from 'common/validations';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { signInStatus, signInError } = useAppSelector((state) => state.auth);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
                />
                <Icon
                  name={isPasswordHidden ? 'eye-slash' : 'eye'}
                  size={20}
                  color="grey"
                  onPress={toggleIsPasswordHidden}
                />
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
    color: '#495070',
  },
  description: {
    fontSize: 18,
    color: '#495057',
  },
  formCard: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    marginTop: 40,
    padding: '5%',
  },
  formText: {
    fontSize: 16,
    color: '#495057',
  },
  formItem: {
    width: '100%',
  },
  formInput: {
    width: '100%',
    height: 40,

    color: '#212529',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ced4da',
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
    borderColor: '#ced4da',
    paddingRight: 10,
    marginTop: 5,
  },
  signInButton: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#4bba73',
    borderRadius: 4,
  },
  signInText: {
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    color: '#dc3545',
  },
  signInErrorText: {
    marginTop: 20,
  },
  errorInput: {
    borderColor: '#dc3545',
  },
  emailInput: {
    marginTop: 5,
  },
});