import { useEffect, useState } from "react";

export default function EmpListing() {
    type User = {
        id: number;
        createdAt: string;
        email: string;
        firstName: string;
        lastName: string;
      };

    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
        fetch('api/users/test').then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            setUsers(res);
        }).catch(err => console.error(err.message));
    },[])
    
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Users listing</h2>
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
                            {
                                users.map(items => {
                                    return (
                                    <tr key={items.id}>
                                        <td>{items.id}</td>
                                        <td>{items.createdAt}</td>
                                        <td>{items.email}</td>
                                        <td>{items.firstName}</td>
                                        <td>{items.lastName}</td>
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