import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmpCreate() {

    const[id, idChange] = useState("");
    const[email, emailChange] = useState("");
    const[firstname, firstnameChange] = useState("");
    const[lastname, lastnameChange] = useState("");
    const navigate = useNavigate();

    const handlesubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const empdata = { email, firstname, lastname };
        try {
          const response = await fetch('http://localhost:5173/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(empdata),
          });
          if (response.ok) {
            // Sikeres mentés esetén navigálás vagy más további teendők
            console.log('User saved successfully');
            navigate('/');
          } else {
            console.error('Failed to save user');
          }
        } catch (error) {
          console.error('Error saving user:', error);
        }
      };
      

    return (
        <div>
            <div>
                <div>
                    <form onSubmit={handlesubmit}>
                        <div>
                            <h2>Employee Create</h2>
                        </div>
                        <div>
                            <div>
                                <label style={{"padding":"5px"}}>id:</label>
                                <input style={{"background":"lightgray", "color":"black"}} value={id} disabled={true}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>createdAt:</label>
                                <input style={{"background":"lightgray", "color":"black"}} disabled={true}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>email:</label>
                                <input required style={{"background":"lightgray", "color":"black"}} value={email} onChange={e => emailChange(e.target.value)}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>firstname:</label>
                                <input style={{"background":"lightgray", "color":"black"}} value={firstname} onChange={e => firstnameChange(e.target.value)}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>lastname:</label>
                                <input style={{"background":"lightgray", "color":"black"}} value={lastname} onChange={e => lastnameChange(e.target.value)}></input>
                            </div>
                            <div style={{"padding":"5px"}}>
                                <button type="submit">Save</button>
                                <Link to="/">Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}