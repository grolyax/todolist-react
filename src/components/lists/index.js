import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddEntityForm from '../common/add-entity-form';
import ListOflists from './list-of-lists';
import Loader from '../common/loader';

import ActionStatus from '../../constants/action-status';

import { addList, deleteList, getLists } from '../../store/lists/actions';

class Lists extends Component {
  componentDidMount() {
    const { getLists } = this.props;

    getLists();
  }

  render() {
    const {
      lists, addList, deleteList, status,
    } = this.props;

    return (
      <>
        <div className="add-form">
          <AddEntityForm onSubmit={addList} />
        </div>

        <div className="lists">
          <ListOflists lists={lists} onDelete={deleteList} />
        </div>

        {status === ActionStatus.LOADING && <Loader />}
      </>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    ActionStatus.IDLE,
    ActionStatus.SUCCEEDED,
    ActionStatus.LOADING,
    ActionStatus.FAILED,
  ]).isRequired,
};

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
    status: state.lists.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addList: (list) => dispatch(addList(list)),
    deleteList: (id) => dispatch(deleteList(id)),
    getLists: () => dispatch(getLists()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
