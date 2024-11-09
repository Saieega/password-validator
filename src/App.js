import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const validatePassword = (password) => {
        const rules = [
            /[A-Z]/,        
            /[a-z]/,        
            /[0-9]/,       
            /[^A-Za-z0-9]/,   
            /.{8,}/         
        ];

        const ruleCount = rules.reduce((count, rule) => count + (rule.test(password) ? 1 : 0), 0);
        return ruleCount;
    };

    const handleChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);

        const count = validatePassword(inputPassword);
        if (count < 3) {
            setValidationMessage('Weak');
        } else if (count === 4) {
            setValidationMessage('Strong');
        } else if (count === 5) {
            setValidationMessage('Very Strong');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Password Validator</h1>
            <input
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={styles.input}
            />
            <p style={{ ...styles.message, ...getMessageStyle(validationMessage) }}>
                {validationMessage}
            </p>
        </div>
    );
};

// Styles defined in a single object
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        padding: '10px',
        margin: '20px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    message: {
        marginTop: '10px',
        fontWeight: 'bold',
    },
    weak: {
        color: 'red',
    },
    strong: {
        color: 'green',
    },
    veryStrong: {
        color: 'blue',
    },
};

// Function to return the appropriate style based on the validation message
const getMessageStyle = (message) => {
    if (message.includes('Weak')) {
        return styles.weak;
    } else if (message.includes('Strong')) {
        return styles.strong;
    } else if (message.includes('Very Strong')) {
        return styles.veryStrong;
    }
    return {};
};

export default App;
