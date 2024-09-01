import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from './hooks/useCreateReview'; // Ensure path is correct
import theme from './theme';

const ReviewForm = () => {
  const navigate = useNavigate();
  const { createReview } = useCreateReview();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string()
      .required('Repository owner\'s username is required'),
    repositoryName: Yup.string()
      .required('Repository name is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100'),
    text: Yup.string(),
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/repository/${repositoryId}`);
      }
    } catch (error) {
      console.error('Error creating review:', error.message);
    }
  };

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
            placeholder="Repository owner's GitHub username"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && <Text style={styles.error}>{errors.ownerName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.error}>{errors.repositoryName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Review"
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            multiline
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Review</Text>
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
  textArea: {
    height: 100,
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
    borderRadius: theme.spacing.small,
    marginTop: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});

export default ReviewForm;
