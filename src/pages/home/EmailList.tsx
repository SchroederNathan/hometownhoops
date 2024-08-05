import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

const EmailList = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (email: string) => {
    try {
      addDoc(collection(db, "email-list"), {
        email: email,
      });
      console.log("Email added to list");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="input-group newsletter">
      <input
        type="email"
        className="form-control"
        placeholder="email@example.com"
        onChange={(e) => setEmail(e.target.value)}
        aria-label="User's Email"
        aria-describedby="email"
      />
      <button
        className="btn btn-primary newsletter-button"
        type="button"
        id="email"
        onClick={() => handleSubmit(email)}
      >
        Subscribe For Updates
      </button>
    </div>
  );
};

export default EmailList;
