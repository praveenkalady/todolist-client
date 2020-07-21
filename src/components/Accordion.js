import React,{ Component } from 'react';
import axios from 'axios';
class Accordion extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
            redirect: false,
            
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = () => {
        this.setState({ toggle: !this.state.toggle });
    }
     deleteItem = id =>{
        axios.delete(`http://localhost:8000/api/v1/todos/${id}`).then(res => window.location.reload(true)).catch(err => console.log(err));
     }
     updateItem = id => {
         axios.patch(`http://localhost:8000/api/v1/todos/${id}`,{status:'done'}).then(res => console.log(res))
         .catch(err => console.log(err));
     }
    render(){
        const { toggle } = this.state;
        return(
            <div className="block">
            <div className="card" >
                <header className="card-header"  >
                    <p className="card-header-title">{this.props.todo.name}</p>
                    <button onClick={this.handleChange}  className="card-header-icon" aria-label="more options">
                     <span  className="icon">
                        <i  className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
                </header>
                { toggle ? <React.Fragment> <div className="card-content">
                <div className="content">
                <p>{this.props.todo.description}</p>
                <p>created:{this.props.todo.createdAt}</p>
                <p>status:{this.props.todo.status}</p>
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                    <button onClick={this.updateItem.bind(this,this.props.id)} className="button is-success">Mark as Done</button>
                    </div>
                    <div className="card-footer-item">
                    <button className="button is-danger" onClick={this.deleteItem.bind(this,this.props.id)}>Delete</button>
                    </div>
                </div>
            </div>
            </React.Fragment> : null }
            </div>
            </div>
        )
    }
}
export default Accordion;

/*<div class="card-footer py-3">
<div class="card-footer-item">
<button class="button is-success">Mark</button>
<button onClick={deleteItem(props.todo.id)} class="button is-danger">Delete</button>
</div>
</div>
*/
