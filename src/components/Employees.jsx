import {useState, useEffect} from 'react'
import Birthdays from './Birthdays'


function Employees() {
    const [data, setData] = useState([]);
    const [checkedUsers, setCheckedUsers] = useState(JSON.parse(window.localStorage.getItem('checkedUsers')) || []);

    useEffect(() => {
        fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    const normalizeData = (data) => {
        return data.reduce((acc, user) => {
            if (acc[user.lastName[0]]) {
                acc[user.lastName[0]].push(user)
            } else {
                acc[user.lastName[0]] = [user]
            }
            return acc;
        }, {})
    }

    function sortData(nData) {
        const entries = Object.entries(nData);
        const sorted = entries.sort((a, b) => {
            if (a[0] > b[0]) {
                return 1;
            } else {
                return -1;
            }
        })
        return Object.fromEntries(sorted);
    }

    let sortedData = sortData(normalizeData(data));
    let dataUsers;

    function addLetters() {
        const letters = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("");
        dataUsers = letters.reduce((acc, value) => {
            return {...acc, [value]: sortedData[value] || []}
        }, {});
        return dataUsers;
    }

    addLetters();

    const updateCheckedUsers = (e) => {
        let tmp = [...checkedUsers];

        if (e.target.checked){
            tmp.push(data.find(u=>u.id===e.target.id))

        } else {
            tmp = tmp.filter(user => user.id !== e.target.id);
        }
        window.localStorage.setItem('checkedUsers', JSON.stringify(tmp));

        setCheckedUsers(tmp);
    }
//list-items - render
//

    function renderUsers(){
        return (
                <ul>
                {
                    Object.entries(dataUsers).map(([letter, users]) => {
                        // data [1,2,3,4,5], checked[1,4];
                        return (
                            <li>
                                <h3>{letter}</h3>
                                <ul>
                                {users.length > 0 ? users.map(usr =>
                                    <li key = {usr.id} >
                                        <label htmlFor={usr.id}>{usr.lastName} {usr.firstName}</label>
                                        <input onClick={updateCheckedUsers} id={usr.id} type="checkbox" checked={checkedUsers.find(checkedUser => checkedUser.id === usr.id)}/>
                                    </li>) :
                                    <li>-----</li>}
                                </ul>
                            </li>
                        )
                    })
                }
                </ul>
        )
    }

return(
    <div className="lists-employees">
        {renderUsers()}
        <Birthdays checkedUsers={checkedUsers}/>
    </div>
)
}

export default Employees