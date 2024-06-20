import { Component } from "react";
import Contoct from "./Contoct";

class Contocts extends Component {
  state = {
    contacts: [],
    inputValueName: "",
    inputValuePhone: "",
  };

  saveLc = () => {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    const contactsLs = JSON.parse(localStorage.getItem("contacts"));
    this.setState({
      contacts: contactsLs,
    });
  };

  inputChangeName = (e) => {
    this.setState({
      inputValueName: e.target.value,
    });
  };
  inputChangePhone = (e) => {
    this.setState({
      inputValuePhone: e.target.value,
    });
  };

  addContactEvent = (e) => {
    e.preventDefault();

    let checkAdd = true;
    this.state.contacts.map((element) => {
      if (element.phone == this.state.inputValuePhone) {
        element.name = this.state.inputValueName;
        checkAdd = false;
      }
    });
    if (checkAdd) {
      console.log("if ok: ", checkAdd);

      const newContact = {
        phone: this.state.inputValuePhone,
        name: this.state.inputValueName,
      };

      this.setState({
        contacts: this.state.contacts.push(newContact),
      });

      console.dir(this.state.contacts);
    }
    console.log("see: ", checkAdd);
    this.saveLc();
  };

  edit = (name, phone) => {
    this.setState({
      inputValueName: name,
      inputValuePhone: phone,
    });
  };

  deleteButtonEvent = (phone) => {
    const constFilter = this.state.contacts.filter((element) => {
      return element.phone !== phone;
    });
    console.log("delete ok", constFilter);

    this.setState(
      {
        contacts: constFilter,
      },
      () => {
        console.log("delete see", this.state.contacts);

        this.saveLc();
      }
    );
  };

  componentDidMount = () => {
    if (!localStorage.getItem("contacts")) {
      localStorage.setItem("contacts", JSON.stringify([]));
      console.log("ok contacts yarandi");
    }
    console.log("ok componentDidMount");

    const contactsLs = JSON.parse(localStorage.getItem("contacts"));
    this.setState({
      contacts: contactsLs,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addContactEvent}>
          <label>Phone:</label>
          <input
            type="text"
            onChange={this.inputChangePhone}
            value={this.state.inputValuePhone}
          />
          <label>Name:</label>
          <input
            type="text"
            onChange={this.inputChangeName}
            value={this.state.inputValueName}
          />

          <button type="submit">Submit</button>
        </form>

        <ul>
          {this.state.contacts.map((element) => {
            return (
              <Contoct
                key={element.phone}
                element={element}
                deleteButtonEvent={this.deleteButtonEvent}
                edit={this.edit}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Contocts;
