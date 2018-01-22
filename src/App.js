import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'


class App extends Component {
  state = {
    contactsArr: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contactsArr: contacts })
    })
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      // return a new list of contacts
      contactsArr: state.contactsArr.filter((c) =>  c.id !== contact.id)
    }))
  }

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contactsProp={this.state.contactsArr} />
      </div>
    )
  }
}

export default App;
