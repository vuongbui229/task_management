import React, { Component } from 'react';

class TaskForm extends Component {
  state = {
    id: '',
    name: '',
    status: false
  }

  componentWillMount() {
    if (this.props.task) {
      const { task } = this.props;
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      const { task } = nextProps;
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      })
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }

  onChange = (e) => {
    let { name, value } = e.target;
    if (name === 'status') { value = e.target.value === 'true' ? true : false }
    this.setState({[name]: value})
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.props.onCloseForm();

  }

  onClear = () => {
    this.setState({
      id: '',
      name: '',
      status: false
    })
  }

  render () {
    const { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id ? "Edit Task" : "Add Task" }
            <span className="fa fa-times-circle text-right" onClick={this.props.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <label>Name :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
            </div>
            <label>Status :</label>
            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Activate</option>
              <option value={false}>Deactivate</option>
            </select><br/>
            <div className="text-center">
              <button type="submit" className="btn btn-warning mr-5">
                Save
              </button>
              <button type="button" className="btn btn-danger" onClick={this.onClear}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>   
    )
  }
}

export default TaskForm;