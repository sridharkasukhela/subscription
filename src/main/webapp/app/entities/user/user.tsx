import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './user.reducer';

export const User = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const userList = useAppSelector(state => state.user.entities);
  const loading = useAppSelector(state => state.user.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="user-heading" data-cy="UserHeading">
        <Translate contentKey="subscriptionApp.user.home.title">Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="subscriptionApp.user.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="subscriptionApp.user.home.createLabel">Create new User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userList && userList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="subscriptionApp.user.id">Id</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('externalUserId')}>
                  <Translate contentKey="subscriptionApp.user.externalUserId">External User Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('externalUserId')} />
                </th>
                <th className="hand" onClick={sort('username')}>
                  <Translate contentKey="subscriptionApp.user.username">Username</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('username')} />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  <Translate contentKey="subscriptionApp.user.firstName">First Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  <Translate contentKey="subscriptionApp.user.lastName">Last Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="subscriptionApp.user.email">Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('registeredDate')}>
                  <Translate contentKey="subscriptionApp.user.registeredDate">Registered Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('registeredDate')} />
                </th>
                <th className="hand" onClick={sort('lastLoginTime')}>
                  <Translate contentKey="subscriptionApp.user.lastLoginTime">Last Login Time</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastLoginTime')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userList.map((user, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user/${user.id}`} color="link" size="sm">
                      {user.id}
                    </Button>
                  </td>
                  <td>{user.externalUserId}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.registeredDate ? <TextFormat type="date" value={user.registeredDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{user.lastLoginTime ? <TextFormat type="date" value={user.lastLoginTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user/${user.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/user/${user.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/user/${user.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="subscriptionApp.user.home.notFound">No Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default User;
