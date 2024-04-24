from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)

    def __init__(self, first_name, last_name, email) -> None:
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
    
    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }
