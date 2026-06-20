import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/adminApi";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getMyTasks,
    updateTask,
    updateTaskStatus,
} from "../api/taskApi";
import type { UserResponse } from "../types/user";
import type { TaskPriority, TaskResponse, TaskStatus } from "../types/task";

function DashboardPage() {
    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const rolesFromStorage = localStorage.getItem("roles");
    const roles: string[] = rolesFromStorage ? JSON.parse(rolesFromStorage) : [];
    const isAdmin = roles.includes("ADMIN");

    const [users, setUsers] = useState<UserResponse[]>([]);
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [myTasks, setMyTasks] = useState<TaskResponse[]>([]);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("HIGH");
    const [assigneeId, setAssigneeId] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    async function loadDashboardData() {
        try {
            const myTasksData = await getMyTasks();
            setMyTasks(myTasksData);

            if (isAdmin) {
                const usersData = await getAllUsers();
                const tasksData = await getAllTasks();

                setUsers(usersData);
                setTasks(tasksData);
            }

            setError("");
        } catch (error) {
            setError("Could not load dashboard data.");
        }
    }

    useEffect(() => {
        loadDashboardData();
    }, []);

    function resetForm() {
        setTitle("");
        setDescription("");
        setPriority("HIGH");
        setAssigneeId("");
        setDueDate("");
        setEditingTaskId(null);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("roles");

        navigate("/login");
    }

    async function handleSubmitTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const taskData = {
            title,
            description,
            priority,
            assigneeId: assigneeId ? Number(assigneeId) : null,
            dueDate,
        };

        try {
            if (editingTaskId) {
                await updateTask(editingTaskId, taskData);
                setSuccessMessage("Task updated successfully");
            } else {
                await createTask(taskData);
                setSuccessMessage("Task created successfully");
            }

            setError("");
            resetForm();

            await loadDashboardData();
        } catch (error) {
            setSuccessMessage("");

            if (editingTaskId) {
                setError("Could not update task. Check required fields and admin access.");
            } else {
                setError("Could not create task. Check required fields and admin access.");
            }
        }
    }

    function handleEditTask(task: TaskResponse) {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description ?? "");
        setPriority(task.priority);
        setAssigneeId(task.assigneeId ? String(task.assigneeId) : "");
        setDueDate(task.dueDate ?? "");

        setSuccessMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    async function handleStatusChange(taskId: number, status: TaskStatus) {
        try {
            await updateTaskStatus(taskId, status);

            setSuccessMessage("Task status updated successfully");
            setError("");

            await loadDashboardData();
        } catch (error) {
            setSuccessMessage("");
            setError("Could not update task status.");
        }
    }

    async function handleDeleteTask(taskId: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTask(taskId);

            setSuccessMessage("Task deleted successfully");
            setError("");

            if (editingTaskId === taskId) {
                resetForm();
            }

            await loadDashboardData();
        } catch (error) {
            setSuccessMessage("");
            setError("Could not delete task.");
        }
    }

    return (
        <div className="page">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div>
                        <h1>Task Manager Dashboard</h1>
                        <p>Welcome, {email}</p>
                        <p>Role: {isAdmin ? "ADMIN" : "EMPLOYEE"}</p>
                    </div>

                    <button className="secondary-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="dashboard-grid">
                    {isAdmin && (
                        <div className="info-card">
                            <h2>Admin Tasks</h2>
                            <p>Create, edit, assign, and delete tasks.</p>
                        </div>
                    )}

                    <div className="info-card">
                        <h2>My Tasks</h2>
                        <p>View assigned tasks and update task status.</p>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                {isAdmin && (
                    <section className="section">
                        <h2>{editingTaskId ? "Edit Task" : "Create Task"}</h2>

                        <form onSubmit={handleSubmitTask} className="task-form">
                            <label>Title</label>
                            <input
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Enter task title"
                                required
                            />

                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Enter task description"
                                rows={3}
                            />

                            <label>Priority</label>
                            <select
                                value={priority}
                                onChange={(event) =>
                                    setPriority(event.target.value as TaskPriority)
                                }
                            >
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="URGENT">URGENT</option>
                            </select>

                            <label>Assignee</label>
                            <select
                                value={assigneeId}
                                onChange={(event) => setAssigneeId(event.target.value)}
                            >
                                <option value="">Unassigned</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName} - {user.email}
                                    </option>
                                ))}
                            </select>

                            <label>Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />

                            <button type="submit">
                                {editingTaskId ? "Update Task" : "Create Task"}
                            </button>

                            {editingTaskId && (
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={resetForm}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </section>
                )}

                <section className="section">
                    <h2>My Assigned Tasks</h2>

                    {myTasks.length === 0 && !error && <p>No assigned tasks found.</p>}

                    {myTasks.length > 0 && (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                </tr>
                                </thead>

                                <tbody>
                                {myTasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.title}</td>
                                        <td>{task.priority}</td>
                                        <td>
                                            <select
                                                value={task.status}
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        task.id,
                                                        event.target.value as TaskStatus
                                                    )
                                                }
                                            >
                                                <option value="TODO">TODO</option>
                                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                <option value="BLOCKED">BLOCKED</option>
                                                <option value="COMPLETED">COMPLETED</option>
                                            </select>
                                        </td>
                                        <td>{task.dueDate ?? "No due date"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {isAdmin && (
                    <section className="section">
                        <h2>All Tasks Admin View</h2>

                        {tasks.length === 0 && !error && <p>No tasks found.</p>}

                        {tasks.length > 0 && (
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Assignee</th>
                                        <th>Due Date</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.title}</td>
                                            <td>{task.priority}</td>
                                            <td>
                                                <select
                                                    value={task.status}
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            task.id,
                                                            event.target.value as TaskStatus
                                                        )
                                                    }
                                                >
                                                    <option value="TODO">TODO</option>
                                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                    <option value="BLOCKED">BLOCKED</option>
                                                    <option value="COMPLETED">COMPLETED</option>
                                                </select>
                                            </td>
                                            <td>{task.assigneeEmail ?? "Unassigned"}</td>
                                            <td>{task.dueDate ?? "No due date"}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditTask(task)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="danger-button"
                                                        onClick={() => handleDeleteTask(task.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {isAdmin && (
                    <section className="section">
                        <h2>Users</h2>

                        {users.length === 0 && !error && <p>No users found.</p>}

                        {users.length > 0 && (
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Enabled</th>
                                        <th>Roles</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>
                                                {user.firstName} {user.lastName}
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.enabled ? "Yes" : "No"}</td>
                                            <td>{user.roles.join(", ")}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;