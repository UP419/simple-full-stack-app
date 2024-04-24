import { useEffect, useState } from "react"
import ContactList from "./ContactList"
import './index.css'
import ContactForm from "./ContactForm"

function App() {

  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchContacts = async () => {
      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()
      setContacts(data.contacts)
  }

  useEffect(()=> {
    fetchContacts()
  }, []
  )

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    if(!isModalOpen) setIsModalOpen(true)
  }

  return (
    <div className="container">
      <ContactList contacts={contacts} fetchContacts={fetchContacts}/>
      <button onClick={openModal}>Create new contact</button>
      { isModalOpen && 
        <div className="modal">
          <button onClick={closeModal}>&times;</button>
          <ContactForm updateFn={fetchContacts}/>
        </div>
      }
    </div>
  )
}

export default App
