import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user.reducer';

export const UserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userEntity = useAppSelector(state => state.user.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userDetailsHeading">
          <Translate contentKey="subscriptionApp.user.detail.title">User</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="subscriptionApp.user.id">Id</Translate>
            </span>
          </dt>
          <dd>{userEntity.id}</dd>
          <dt>
            <span id="externalUserId">
              <Translate contentKey="subscriptionApp.user.externalUserId">External User Id</Translate>
            </span>
          </dt>
          <dd>{userEntity.externalUserId}</dd>
          <dt>
            <span id="username">
              <Translate contentKey="subscriptionApp.user.username">Username</Translate>
            </span>
          </dt>
          <dd>{userEntity.username}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="subscriptionApp.user.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{userEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="subscriptionApp.user.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{userEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="subscriptionApp.user.email">Email</Translate>
            </span>
          </dt>
          <dd>{userEntity.email}</dd>
          <dt>
            <span id="registeredDate">
              <Translate contentKey="subscriptionApp.user.registeredDate">Registered Date</Translate>
            </span>
          </dt>
          <dd>
            {userEntity.registeredDate ? <TextFormat value={userEntity.registeredDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastLoginTime">
              <Translate contentKey="subscriptionApp.user.lastLoginTime">Last Login Time</Translate>
            </span>
          </dt>
          <dd>{userEntity.lastLoginTime ? <TextFormat value={userEntity.lastLoginTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user/${userEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserDetail;
