import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("saketh@example.com");
    const [password, setPassword] = useState("Password123");
    const [message, setMessage] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await loginUser({
                email,
                password,
            });

            localStorage.setItem("token", response.token);
            localStorage.setItem("email", response.email);
            localStorage.setItem("roles", JSON.stringify(response.roles ?? []));

            setMessage("Login successful");

            navigate("/dashboard");
        } catch (error) {
            setMessage("Login failed. Check email and password.");
        }
    }

    return (
        <div className="page">
            <div className="card">
                <h1>Task Manager Login</h1>
                <p>Login using your registered account.</p>

                <form onSubmit={handleLogin}>
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

                    <button type="submit">Login</button>
                </form>

                {message && <p className="message">{message}</p>}

                <button className="link-button" onClick={() => navigate("/register")}>
                    Create new account
                </button>
            </div>
        </div>
    );
}

export default LoginPage;