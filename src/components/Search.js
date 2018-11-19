import React, { Component } from 'react';

class Search extends Component {
    state = {
        keyword: ""
    }

    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name]: value  
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }
    
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                <input
                    name="keyword"
                    type="text"
                    className="form-control"
                    placeholder="Input keyword..."
                    onChange={this.onChange}
                />
                <span className="input-group-btn">
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.onSearch}
                    >Search</button>
                </span>
            </div>
        </div> 
        )
    }
}

export default Search;