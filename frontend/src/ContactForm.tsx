import { useState } from "react";


const ContactForm = ({firstNameProp="", lastNameProp="", emailProp="", id=null, isUpdate=false, updateFn=null}) => {
    const [firstName, setFirstName] = useState(firstNameProp)
    const [lastName, setLastName] = useState(lastNameProp)
    const [email, setEmail] = useState(emailProp)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            "firstName" :firstName,
            "lastName" : lastName,
            "email" : email
        }
        let url = "http://127.0.0.1:5000/"
        if(isUpdate){
            url = url + "update_contact/" + id
        }else{  
            url = url + "add_contact"
        }
        
        const options = {
            method: (isUpdate) ? "PATCH" : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }

        const response = await fetch(url, options)

        if(response.status != 201 && response.status != 200){
            const data = await response.json()
            alert(data.message)
        }else{
            setFirstName("")
            setLastName("")
            setEmail("")
            updateFn()
        }

    }

    const buttonText = (isUpdate) ? "Update contact" : "Add contact";

    return <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <input  type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                required>
        </input>
        <label htmlFor="lastName">Last Name: </label>
        <input  type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                required>
        </input>
        <label htmlFor="email">Email: </label>
        <input  type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required>
        </input>
        <button type="submit">{buttonText}</button>
    </form>
}

export default ContactForm;