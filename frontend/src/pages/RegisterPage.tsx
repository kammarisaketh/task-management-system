import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function RegisterPage() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("Saketh");
    const [lastName, setLastName] = useState("Kammari");
    const [email, setEmail] = useState("newuser@example.com");
    const [password, setPassword] = useState("Password123");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await registerUser({
                firstName,
                lastName,
                email,
                password,
            });

            setMessage(`Registration successful for ${response.email}`);
            setError("");
        } catch (error) {
            setMessage("");
            setError("Registration failed. Email may already exist.");
        }
    }

    return (
        <div className="page">
            <div className="card">
                <h1>Create Account</h1>
                <p>Register a new employee account.</p>

                <form onSubmit={handleRegister}>
                    <label>First Name</label>
                    <input
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Enter first name"
                        required
                    />

                    <label>Last Name</label>
                    <input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Enter last name"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <button className="link-button" onClick={() => navigate("/login")}>
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;