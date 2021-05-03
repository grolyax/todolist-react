import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik } from 'formik';
import EntityType from '../../constants/entity-type';

const placeholderByEntityType = {
  [EntityType.LIST]: 'Enter list name...',
  [EntityType.TASK]: 'Enter task...',
};

export default class AddEntityForm extends Component {
  constructor() {
    super();

    this.validationSchema = Yup.object().shape({
      name: Yup.string().required(),
    });
  }

  handleSubmit = (values, actions) => {
    const { onSubmit } = this.props;

    onSubmit(values);

    actions.resetForm();
  }

  render() {
    const { type } = this.props;

    return (
      <Formik
        initialValues={{ name: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={this.validationSchema}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={placeholderByEntityType[type]}
              onChange={handleChange}
              value={values.name}
            />

            <button type="submit">
              <i className="fas fa-plus" />
            </button>
          </form>
        )}
      </Formik>
    );
  }
}

AddEntityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
