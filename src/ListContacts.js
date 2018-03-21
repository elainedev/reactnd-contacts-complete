import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contactsProp: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  updateQuery = input => {
    this.setState({query: input.trim() })
  }

  clearQuery = () => {
    this.setState( {query: ""} )
  }

  render(){
    const { contactsProp, onDeleteContact } = this.props
    const { query } = this.state
    let showingContacts
    if (query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contactsProp.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contactsProp
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          <Link
            to="#create"
            className='add-contact'
          >Add Contact</Link>
        </div>

        {showingContacts.length !== contactsProp.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contactsProp.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={
                  {
                    backgroundImage: `url(${contact.avatarURL})`
                  }
                }/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>

    )
  }
}



export default ListContacts
