import  React, { useState, useEffect } from "react";
import { getEmails } from "../services/emails.service.ts";

// This is my Final Assessment for the Direcho Trabaho - Web Development with React.js Porgram
// The styling of the Email Input was taken from the example codes CSS file

// -- Franc Alvenn Dela Cruz

const EmailInput = () => {
    const [emailList, setEmailList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);

    // Get the emial from the emails.js
    useEffect(() => {
        getEmails().then((data) => {
        setEmailList(data);
        });
    }, []);

    const validateEmail = (email) => {
        // This is the pattern to check if email is avalid or not
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email)
    }

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        //Delayed search -- Idea From Stack Overflow (https://stackoverflow.com/questions/13798051/want-to-set-delay-in-javascript)
        setTimeout(search, 1000);
        function search(){
            if (query) {
                const filteredEmails = emailList.filter(email =>
                    email.toLowerCase().includes(query)
                );
                setFilteredEmails(filteredEmails);
                setLoading(false);
            } else {
                getEmails().then((data) => {
                    setFilteredEmails(data);
                    setLoading(false);
                });
            }
        }
    };

    const handleOnKeyUp = (event) => {
        if ((event.key === "Enter") && searchQuery) {
            event.preventDefault();
            const email = searchQuery.trim();
            if (!selectedEmails.includes(email)) {
                setSelectedEmails([...selectedEmails, email]);
                setSearchQuery("");
                setFilteredEmails([]);
            }
        }
        if (event.key === "Backspace" && searchQuery === "" && selectedEmails.length > 0) {
            setSelectedEmails(selectedEmails.slice(0, -1));
        }
    };

    const handleSelectEmail = (email) => {
        if (!selectedEmails.includes(email)) {
            setSelectedEmails([...selectedEmails, email]);
            setSearchQuery("");
            setFilteredEmails([]);
        }
    }

    const handleRemoveEmail = (email) => {
        setSelectedEmails(selectedEmails.filter(e => e !== email));
    }
    
    function loader () {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
    <div className="root">
    <div className="pageContainer">
        <div className="emailContainer">
            <ul className="emailTagContainer">
                {selectedEmails.map((email, index) => (
                    <li key={index} className={`emailTag ${validateEmail(email) ? "valid" : "invalid"}`}>
                        <span className="emailTagText">{email}</span>
                        <span className={`icon ${validateEmail(email) ? "close" : "alert"}`} onClick={() => handleRemoveEmail(email)}></span>
                    </li>
                ))}
                <li className="inputContainer">
                    <input
                        type="text"
                        placeholder="Enter Recipients..."
                        className="emailInput"
                        onChange={(e)=>{handleSearch(e);loader()}}
                        onKeyUp={handleOnKeyUp}
                        value={searchQuery}
                    >
                    </input>
                </li>
            </ul>
            {loading && <img src="https://i.gifer.com/DzUd.gif" className="loader" alt="Description" />}
        </div>
    </div>
    {searchQuery && <div className="dropdownWrapper">
        <ul className="dropdownContainer">
            {filteredEmails.map((email, index) => (
                <li key={index} className="dropdownItem" onClick={() => handleSelectEmail(email)}>
                    {email}
                </li>
            ))}
        </ul>
    </div>}
    </div>
)
}


export default EmailInput;