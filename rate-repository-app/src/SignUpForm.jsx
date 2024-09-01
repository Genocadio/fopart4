import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateUser from './hooks/useCreateUser'; // Import custom hook for creating a user
import useSignIn from './hooks/useSignIn'; // Import custom hook for signing in
import theme from './theme';

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { createUser, loading: createUserLoading, error: createUserError } = useCreateUser();
  const [signIn, { loading: signInLoading, error: signInError }] = useSignIn();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      // Create a new user
      const { data } = await createUser({
        variables: { user: { username, password } },
      });

      console.log('User created:', data);

      if (data) {
        // Sign in the newly created user
        await signIn({ username: username, password: password });

        // Redirect to reviewed repositories list
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (createUserLoading || signInLoading) return <Text>Loading...</Text>;
  if (createUserError || signInError) return <Text>Error: {createUserError?.message || signInError?.message}</Text>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: theme.spacing.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
    elevation: 3, // Optional: Adds shadow on Android
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});

export default SignUpForm;
