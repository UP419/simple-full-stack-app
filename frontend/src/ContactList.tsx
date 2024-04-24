import ContactForm from './ContactForm';
import './index.css';
import { useState } from 'react';


const ContactList = ({contacts, fetchContacts}) => {

    const [updateRow, setUpdateRow]= useState(-1)

    const handleUpdate = () => {
        setUpdateRow(-1)
        fetchContacts()
    }

    const handleDelete = async (contact) => {
        const url = "http://127.0.0.1:5000/delete_contact/" + contact.id
        const options = {
            method: "DELETE"
        }

        const response = await fetch(url, options)
        if (response.status != 200){
            const data = await response.json()
            alert(data.message)
        }else{
            console.log("deleted successfully")
            fetchContacts()
        }

    }
    return (
        <div>
            <div className="header">
                <h2>First Name</h2>
                <h2>Last Name</h2>
                <h2>Email</h2>
                <h2>Actions</h2>
            </div>
            {contacts.map((contact) => (
                <div key={contact.id} className="contacts_list">
                    <h2>{contact.firstName}</h2>
                    <h2>{contact.lastName}</h2>
                    <h2>{contact.email}</h2>
                    <div className="buttons">
                        <button onClick={() => setUpdateRow(contact.id)}>Update</button>
                        <button onClick={() => handleDelete(contact)}>Delete</button>
                    </div>
                    {updateRow == contact.id &&
                        <ContactForm firstNameProp={contact.firstName}
                         lastNameProp={contact.lastName}
                          emailProp={contact.email} 
                          id={contact.id}
                        isUpdate={true}
                        updateFn={handleUpdate}
                        />
                    }
                </div>
            )
            )}
        </div>
    )
}

export default ContactList;