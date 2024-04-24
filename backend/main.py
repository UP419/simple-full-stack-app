from models import Contact
from config import app, db
from flask import request, jsonify

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    contacts_json = list(map(lambda contact: contact.to_json(), contacts))
    return jsonify({"contacts" : contacts_json})

@app.route("/add_contact", methods=["POST"])
def add_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    if not first_name or not last_name or not email:
        return (jsonify({"message" : "Not all params are included"}), 400)
    new_contact = Contact(first_name, last_name, email)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message" : str(e)}), 400

    return jsonify({"message" : "contact was added successfully"}), 201    

@app.route("/update_contact/<int:id>", methods=["PATCH"])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "contact not found"}), 404
    
    data = request.json
    # if key "firstName" does not exist, get method returns contact.first_name => value stays the same
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    # contact already added in the session, only commit is needed
    db.session.commit()

    return jsonify({"message":"contact updated"}), 200


@app.route("/delete_contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message" : "contact was removed successfully"}), 200

    
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
