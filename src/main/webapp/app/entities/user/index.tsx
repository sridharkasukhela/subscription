import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import User from './user';
import UserDetail from './user-detail';
import UserUpdate from './user-update';
import UserDeleteDialog from './user-delete-dialog';

const UserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<User />} />
    <Route path="new" element={<UserUpdate />} />
    <Route path=":id">
      <Route index element={<UserDetail />} />
      <Route path="edit" element={<UserUpdate />} />
      <Route path="delete" element={<UserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserRoutes;
