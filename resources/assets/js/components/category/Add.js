import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Add extends Component {
    constructor()
    {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onChangeCategoryEmail = this.onChangeCategoryEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            category_name:'',
            category_email:'',
            alert_message:''
        }
    }

    onChangeCategoryName(e)
    {
        this.setState({
            category_name:e.target.value
        })
    }

    onChangeCategoryEmail(e)
    {
        this.setState({
            category_email:e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        const category = {
            category_name : this.state.category_name,
            category_email: this.state.category_email
        }

        axios.post('http://testing.vince/api/category/store', category)
        .then(res=>{
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        })

        this.setState({ category_name: '' })
        this.setState({ category_email: '' })
    }

    render() {
        return (
          <div>
            <hr />
            
            {this.state.alert_message=="success"?<SuccessAlert message={"Category Added Successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error Occured while adding the category."} />:null}

            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="category_name" 
                        value={this.state.category_name}
                        onChange={this.onChangeCategoryName} 
                        placeholder="Enter Category" />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" 
                        className="form-control" 
                        id="category_email" 
                        value={this.state.category_email}
                        onChange={this.onChangeCategoryEmail} 
                        placeholder="Enter Email Address" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div> 
        );
    }
}
