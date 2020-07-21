import React,{ Component } from 'react';
import axios from 'axios';
import Accordion from './Accordion';

class DisplayTodos extends Component {
    constructor(props){
        super(props);
        this.state ={
            todos:[],
            isLoading:true,
        }
        this.nameInput = React.createRef();
        this.description = React.createRef();
    }
    onSubmit = e =>{
        e.preventDefault();
        const todo = {
            name:this.nameInput.current.value,
            description:this.description.current.value
        };
       axios({
            method: 'post',
            url:'http://localhost:8000/api/v1/todos',
            data:todo
        }).then(res => this.setState({todos:this.state.todos.push(res.data.data.todos)})).catch(err => console.log(err));
    window.location.reload(true);
    }
    
    componentDidMount(){
       axios.get('http://localhost:8000/api/v1/todos').then(res => this.setState({todos:res.data.data.todos})).catch(err => console.log(err))
        this.setState({ isLoading: false });
    }
    render(){
        const { todos,isLoading} = this.state;
        return (
            <React.Fragment>
            <div className="columns is-centered">
            <div className="column is-7">
            <div className="field mb-6">
            <p className="title is-size-5 has-text-centered">Add Your Todo</p>
            <label className="label">Title</label>
                <div className="control">
                    <input ref={this.nameInput}  name="name" className="input" type="text" placeholder="Type Title"></input>
            </div>
            <label className="label">Description</label>
            <div className="control">
            <textarea ref={this.description} name="description" className="textarea" placeholder="Type Your Work..."></textarea>
                <div className="field">
                    <div className="control">
                    <button onClick={this.onSubmit} className="button is-primary mt-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
            {
                isLoading === false && todos.map((todo,i)=> (
                    <Accordion key={i} id={todo._id} todo={todo} />
                ))
            }
            </div>
        </div>
        </React.Fragment>
        )
    }
}


export default DisplayTodos;
