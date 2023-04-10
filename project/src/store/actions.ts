import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../common/constants';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
