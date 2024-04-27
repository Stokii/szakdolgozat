import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmpListing() {
    type User = {
        id: number;
        createdAt: string;
        email: string;
        firstName: string;
        lastName: string;
      };

    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('api/users/test').then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            setUsers(res);
        }).catch(err => console.error(err.message));
    },[])

    const LoadDetails = (id: string | number) => {
        navigate('/employee/details/'+ id);
    }

    const RemoveFunction = (id: string | number) => {

    }

    const LoadEdit = (id: string | number) => {

    }
    
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Users list</h2>
                </div>
                <div>
                    <Link to="employee/create">Add new (+)</Link>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>createdAt</td>
                                <td>email</td>
                                <td>firstname</td>
                                <td>lastname</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map(items => {
                                    return (
                                    <tr key={items.id}>
                                        <td>{items.id}</td>
                                        <td>{items.createdAt}</td>
                                        <td>{items.email}</td>
                                        <td>{items.firstName}</td>
                                        <td>{items.lastName}</td>
                                        <td>
                                            <button onClick={() => {LoadEdit(items.id)}}>edit</button>
                                            <button onClick={() => {RemoveFunction(items.id)}}>remove</button>
                                            <button onClick={() => {LoadDetails(items.id)}}>details</button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}