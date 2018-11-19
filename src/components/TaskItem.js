import React, { Component } from 'react';

class TaskItem extends Component {
  render() {
    const { task, index } = this.props;

    return (
      <tr>
        <td className="text-center">{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span 
            className={task.status? "label label-danger status" : "label label-success status"}
            onClick={() => this.props.onUpdateStatus(task.id)}
          >
            {task.status? "Activated" : "Hidden"}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={() => this.props.onUpdate(task.id)}>Edit</button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(task.id)}>Delete</button>
        </td>
      </tr>
    )
  }
}

export default TaskItem;