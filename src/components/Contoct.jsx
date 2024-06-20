import { Component } from "react";

class Contoct extends Component {
  edit = () => {
    this.props.edit(this.props.element.name, this.props.element.phone);
  };

  delete = () => {
    this.props.deleteButtonEvent(this.props.element.phone);
  };

  render() {
    return (
      <li>
        <p>Name: {this.props.element.name}</p>
        <p>Phone: {this.props.element.phone}</p>

        <button onClick={this.edit}>Edit</button>
        <button onClick={this.delete}>Delete</button>
      </li>
    );
  }
}

export default Contoct;
