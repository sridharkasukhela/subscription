import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { createEntity, getEntity, reset, updateEntity } from './user.reducer';

export const UserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const userEntity = useAppSelector(state => state.user.entity);
  const loading = useAppSelector(state => state.user.loading);
  const updating = useAppSelector(state => state.user.updating);
  const updateSuccess = useAppSelector(state => state.user.updateSuccess);

  const handleClose = () => {
    navigate('/user');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.registeredDate = convertDateTimeToServer(values.registeredDate);
    values.lastLoginTime = convertDateTimeToServer(values.lastLoginTime);

    const entity = {
      ...userEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          registeredDate: displayDefaultDateTime(),
          lastLoginTime: displayDefaultDateTime(),
        }
      : {
          ...userEntity,
          registeredDate: convertDateTimeFromServer(userEntity.registeredDate),
          lastLoginTime: convertDateTimeFromServer(userEntity.lastLoginTime),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="subscriptionApp.user.home.createOrEditLabel" data-cy="UserCreateUpdateHeading">
            <Translate contentKey="subscriptionApp.user.home.createOrEditLabel">Create or edit a User</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-id"
                  label={translate('subscriptionApp.user.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('subscriptionApp.user.externalUserId')}
                id="user-externalUserId"
                name="externalUserId"
                data-cy="externalUserId"
                type="text"
              />
              <ValidatedField
                label={translate('subscriptionApp.user.username')}
                id="user-username"
                name="username"
                data-cy="username"
                type="text"
              />
              <ValidatedField
                label={translate('subscriptionApp.user.firstName')}
                id="user-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('subscriptionApp.user.lastName')}
                id="user-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField label={translate('subscriptionApp.user.email')} id="user-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('subscriptionApp.user.registeredDate')}
                id="user-registeredDate"
                name="registeredDate"
                data-cy="registeredDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('subscriptionApp.user.lastLoginTime')}
                id="user-lastLoginTime"
                name="lastLoginTime"
                data-cy="lastLoginTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserUpdate;
