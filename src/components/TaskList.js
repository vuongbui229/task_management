import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    state = {
      filterName: '',
      filterStatus: -1 // all: -1, active: 1, deactive: 0
    }

    onChange = (event) => {
      const {name, value} = event.target;
      console.log(name, value)
      this.props.onFilter(
        name === 'filterName'? value : this.state.filterName,
        name === 'filterStatus'? value : this.state.filterStatus
      )
      this.setState({[name]: value})
    }


    render() {
      const { tasks } = this.props;
      const {filterName, filterStatus} = this.state;

      const elmTasks = tasks.map((task, index) => {
        return <TaskItem key={task.id} task={task} index={index} onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete} onUpdate={this.props.onUpdate} />
      })

      return (
        <table className="table table-bordered table-hover mt-15">
          <thead>
            <tr>
              <th className="text-center">Order</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChange} />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>All</option>
                  <option value={0}>Hidden</option>
                  <option value={1}>Activated</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTasks}
          </tbody>
        </table>
      )
    }
}

export default TaskList;