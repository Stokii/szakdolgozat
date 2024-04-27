import { Link } from "react-router-dom";

export default function EmpCreate() {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <h2>Employee Create</h2>
                        </div>
                        <div>
                            <div>
                                <label style={{"padding":"5px"}}>id:</label>
                                <input style={{"background":"lightgray"}}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>createdAt:</label>
                                <input style={{"background":"lightgray"}}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>email:</label>
                                <input style={{"background":"lightgray"}}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>firstname:</label>
                                <input style={{"background":"lightgray"}}></input>
                            </div>
                            <div>
                                <label style={{"padding":"5px"}}>lastname:</label>
                                <input style={{"background":"lightgray"}}></input>
                            </div>
                            <div style={{"padding":"5px"}}>
                                <button type="submit">Save</button>
                                <Link to="/">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}