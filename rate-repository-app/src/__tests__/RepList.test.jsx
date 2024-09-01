/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import RepositoryList from '../RepositoryList'; // Adjust the import path if necessary
import useRepositories from '../hooks/useRepositories'; // Adjust the import path if necessary

// Mock the useRepositories hook
jest.mock('../hooks/useRepositories');

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      // Mock implementation for useRepositories hook
      useRepositories.mockReturnValue({
        repositories: [
          {
            id: 'repository-item-1',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          {
            id: 'repository-item-2',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
        ],
        loading: false,
      });

      render(<RepositoryList />);

      await waitFor(() => {
        // Assertions for the first repository
        expect(screen.getByTestId('repository-item-repository-item-1')).toBeTruthy();
        expect(screen.getByTestId('avatar-repository-item-1')).toBeTruthy();
        expect(screen.getByTestId('repository-info-repository-item-1')).toBeTruthy();
        expect(screen.getByTestId('repository-stats-repository-item-1')).toBeTruthy();
        
        expect(screen.getByTestId('repository-stats-repository-item-1-stars-count')).toHaveTextContent('21.9k');
        expect(screen.getByTestId('repository-stats-repository-item-1-forks-count')).toHaveTextContent('1.6k');
        expect(screen.getByTestId('repository-stats-repository-item-1-rating-count')).toHaveTextContent('88');
        expect(screen.getByTestId('repository-stats-repository-item-1-reviews-count')).toHaveTextContent('3');
        
        // Assertions for the second repository
        expect(screen.getByTestId('repository-stats-repository-item-2-stars-count')).toBeTruthy();
        expect(screen.getByTestId('repository-stats-repository-item-2-forks-count')).toBeTruthy();
        expect(screen.getByTestId('repository-stats-repository-item-2-rating-count')).toBeTruthy();
        expect(screen.getByTestId('repository-stats-repository-item-2-reviews-count')).toBeTruthy();
        
        expect(screen.getByTestId('repository-stats-repository-item-2-stars-count')).toHaveTextContent('1.8k');
        expect(screen.getByTestId('repository-stats-repository-item-2-forks-count')).toHaveTextContent('69');
        expect(screen.getByTestId('repository-stats-repository-item-2-rating-count')).toHaveTextContent('72');
        expect(screen.getByTestId('repository-stats-repository-item-1-reviews-count')).toHaveTextContent('3');
      });
    });

    it('displays loading message while loading', () => {
      useRepositories.mockReturnValue({
        repositories: [],
        loading: true,
      });

      render(<RepositoryList />);

      expect(screen.getByTestId('loading-message')).toBeTruthy();
    });

    it('displays no repositories message when there are no repositories', () => {
      useRepositories.mockReturnValue({
        repositories: [],
        loading: false,
      });

      render(<RepositoryList />);

      expect(screen.getByTestId('no-repositories-message')).toBeTruthy();
    });
  });
});
