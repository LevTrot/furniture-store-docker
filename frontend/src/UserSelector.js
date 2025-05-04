import React, { useEffect, useState } from 'react';
import { getAll } from './api';

const UserSelector = ({ currentUser, setCurrentUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await getAll('users');
            setUsers(data);
            console.log("Users in Frontend loaded")
        };
        load();
    }, []);

    const handleChange = (e) => {
        const selectedUser = users.find((u) => u._id === e.target.value);
        setCurrentUser(selectedUser);
    };

    return(
        <select value={currentUser?._id || ''} onChange={handleChange}>
            <option value="">Выберите пользователя</option>
            {users.map((user)    => (
                <option key={user._id} value={user._id}>
                    {user.name} ({user.role.name})
                </option>
            ))}
        </select>
    );
};

export default UserSelector;