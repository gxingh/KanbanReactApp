import React, { Component } from 'react';
import './App.css';

class AddCard extends Component{
  constructor(props){
    super(props);
    this.state={
      value:""
    }
  }
  handleSubmit(){
    this.props.handleSubmit(this.state.value);
    this.setState({
      value:""
    })
  }
  handleChange=(event)=>{
    this.setState({
      value:event.target.value
    })
  }
  render(){
    return(
      <div>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="button" className="btn btn-outline-primary btn-sm" value="Add Card" onClick={()=>this.handleSubmit()}/>
      </div>
    );
  }
}

class Board extends Component{
  constructor(props){
    super(props);
    this.state={
      cards:[],
      editTitle:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(text){
    if(text!=="" && text!==undefined && text!==null){
      var cards = this.state.cards;
      this.setState({
        cards:cards.concat([text])
      });
    }
  }
  handleDelete(i){
    let cards = this.state.cards;
    cards.splice(i,1);
    this.setState({
      cards:cards
    })
  }

  render(){
    const cards = this.state.cards.map((cardText, index)=>{
      return(
        <div key={index} className="card border-primary mb-3 overflow-auto">
          <div >
            <p className="card-text float-left">{cardText}</p>
            <button key = {index} className="btn btn-dark btn-sm float-right" onClick={()=>this.handleDelete(index)}>X</button>
          </div>
        </div>
      );
    });
    return(
      <div className="col-3 dummy2">
        <div className="card bg-light mb-3">
          <div class="card-header">
            <h5>{this.props.boardTitle}</h5>
          </div>
          <div class="card-body">
            {cards}
            <AddCard handleSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      boards:["Board1"]
    }
    this.handleAddBoard = this.handleAddBoard.bind(this);
  }
  handleAddBoard(){
    let boards = this.state.boards;
    boards.push("Board"+(boards.length+1))
    this.setState({
      boards:boards
    });
  }
  render() {
    const boards = this.state.boards.map((boardTitle, index)=>{
      return(
        <Board key={index} boardTitle={boardTitle}/>
      );
    });
    return (
      <div className="container app">
        <div className="row header">
          <h3>Kanban</h3>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={()=>this.handleAddBoard()}>Add board</button>
        </div>
        <div className="row justify-content-start boards">
          {boards}
        </div>
      </div>
    );
  }
}

export default App;
