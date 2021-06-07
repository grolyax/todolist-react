import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import AddEntityForm from '../common/add-entity-form';
import ListOfLists from './list-of-lists';
import Loader from '../common/loader';

import EntityType from '../../constants/entity-type';
import ActionStatus from '../../constants/action-status';

import { addList, deleteList, getLists, updateList } from '../../store/lists/actions';

class Lists extends Component {
  componentDidMount() {
    const {
      getLists,
      auth0: { user },
    } = this.props;

    getLists(user.sub);
  }

  handleAddList = (newList) => {
    const {
      auth0: { user },
      addList,
    } = this.props;

    addList({ ...newList, userId: user.sub });
  };

  render() {
    const {
      lists, deleteList, updateList, status,
    } = this.props;

    return (
      <>
        <div className="add-form">
          <AddEntityForm onSubmit={this.handleAddList} type={EntityType.LIST} />
        </div>

        <div className="lists">
          <ListOfLists
            lists={lists}
            onDelete={deleteList}
            onEdit={updateList}
          />
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
    updateList: (id) => dispatch(updateList(id)),
    deleteList: (listId) => dispatch(deleteList(listId)),
    getLists: (userId) => dispatch(getLists(userId)),
  };
}

export default withAuth0(connect(mapStateToProps, mapDispatchToProps)(Lists));
