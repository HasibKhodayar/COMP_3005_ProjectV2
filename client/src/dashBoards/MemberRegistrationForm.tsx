import React, { useState } from 'react';
import axios from 'axios';

const MemberRegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [memberType, setMemberType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const clearStates = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMemberType('');
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/members/register', {
                firstName,
                lastName,
                email,
                phone,
                memberTypeId: parseInt(memberType)
            });
            setSuccessMessage('Member registered successfully.');
            setErrorMessage('');
            clearStates();
            console.log(response.data);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Failed to register member. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Member Registration</h2>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Member Type:</label>
                    <input type="number" value={memberType} onChange={(e) => setMemberType(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default MemberRegistrationForm;
