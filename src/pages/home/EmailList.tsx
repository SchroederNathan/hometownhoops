import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { set } from "date-fns";
import toast from "react-hot-toast";

const EmailList = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleSubmit = async (email: string) => {
    try {
      // Reference to the document with the email as its ID
      const emailRef = doc(collection(db, "email-list"), email);

      // Email does not exist, add it to the collection
      await setDoc(emailRef, { email: email });
      setEmail("");
      toast.success("Subscribed to email list!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="input-group newsletter">
        <input
          type="email"
          className="form-control"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="User's Email"
          aria-describedby="email"
        />
        <button
          className="btn btn-primary newsletter-button"
          type="button"
          id="email"
          onClick={() => {
            if (validateEmail(email)) {
              handleSubmit(email);
              setEmailError("");
            } else {
              setEmailError("Please enter a valid email address");
            }
          }}
        >
          Subscribe For Updates
        </button>
      </div>
      {emailError ? (
        <p className="text-danger" role="">
          {emailError}
        </p>
      ) : null}
    </>
  );
};

export default EmailList;
