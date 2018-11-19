import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
            <Search onSearch={this.props.onSearch} /> 
            <Sort onSort={this.props.onSort} sort={this.props.sort} />
            </div>
        )
    }
}

export default Control;