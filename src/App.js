import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'

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

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact} contactsProp={this.state.contactsArr}
          />
        )} />
        <Route path='/create' component={CreateContact} />
      </div>
    )
  }
}

export default App;
