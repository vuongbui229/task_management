import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import axios from 'axios';

class App extends Component {
  state = {
    tasks: [],
    isDisplayForm: false,
    taskEditing: '',
    selectedFile: null,
    loaded: 0,
    filter: {
      name: '',
      status: -1
    },
    keyword: "",
    sort: {
      by: "name",
      value: 1
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({tasks: tasks})
    }
  }

  s4() {
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  generateId() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4()
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onOpenForm = () => {
    if (this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      })
    } else {
      this.setState({
        isDisplayForm: true
      })
    }
  }

  onSubmit = (data) => {
    const { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateId();
      const newTasks = [...tasks, data]
      this.setState({tasks: newTasks})
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    } else {
      const newTasks = tasks.map(task => {
        if (task.id === data.id ) {
          task = data;
        }
        return task;
      })
      this.setState({tasks: newTasks})
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    }
  }

  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = !task.status
      }
      return task;
    })
    this.setState({tasks: newTasks})
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  onDelete = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== id)
    this.setState({tasks: newTasks})
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.onCloseForm();
  }

  onUpdate = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id === id)
    const taskEditing = newTasks[0];
    this.setState({isDisplayForm: true, taskEditing: taskEditing})
  }

  onFilter = (filterName, filterStatus) => {
    console.log(filterName, filterStatus)
    filterStatus = parseInt(filterStatus,10)
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSort = (filterName, filterStatus) => {
    this.setState({
      sort: {
        by: filterName,
        value: filterStatus
      }
    })
  }

  onSearch =(keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, sort, keyword } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1? true : false);
        }
      })
    }
    if (sort) {
      if(sort.by === "name") {
        tasks.sort((a,b) => {
          if(a.name > b.name) return sort.value;
          else if(a.name < b.name) return -sort.value;
          else return 0;
        })
      } else {
        tasks.sort((a,b) => {
          if(a.status > b.status) return -sort.value;
          else if(a.status < b.status) return sort.value;
          else return 0;
        })
      }
    }
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Management</h1>
        </div>
        <div className="row">
          {isDisplayForm ? 
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm task={taskEditing} onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} />
          </div> : null }
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={this.onOpenForm}
            >
              <span className="fa fa-plus mr-5"></span>Add Task
            </button>
            <Control 
              onSort={this.onSort}
              sort={sort}
              onSearch={this.onSearch}
            />
            <TaskList 
              tasks={tasks} 
              onUpdateStatus={this.onUpdateStatus} 
              onDelete={this.onDelete} 
              onUpdate={this.onUpdate}
              onFilter={this.onFilter} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
