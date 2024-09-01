// SignInForm.jsx
import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme'; // Adjust the path as needed

const SignInForm = ({ onSubmit, loading, error }) => {
  const validationSchema = yup.object().shape({
    Username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    Username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values); // Call the passed in onSubmit with the form values
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.Username && formik.errors.Username && styles.errorInput
        ]}
        placeholder="Username"
        value={formik.values.Username}
        onChangeText={formik.handleChange("Username")}
        keyboardType="default"
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.Username && formik.errors.Username && (
        <Text style={styles.errorText}>{formik.errors.Username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.backgroundWhite} />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </Pressable>
      {error && <Text style={styles.errorText}>Sign-in failed: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.backgroundWhite,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colors.backgroundWhite,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },
});

export default SignInForm;
