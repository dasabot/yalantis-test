import React, {useState} from 'react'
import Employees from "./Employees";

function Birthdays(props) {
    const options_1 = {month: 'long', day: 'numeric' }
    const options_2 = {year: 'numeric' }
    let date;
    const dates = [];

    const temp = props.checkedUsers > 0 ? props.checkedUsers.forEach(checkedUser => dates.push(checkedUser.dob)) : dates;

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return(
        <>
            <h3>Employees birthday</h3>
        <div>
            {props.checkedUsers && props.checkedUsers.map(usr=> <p> {usr.lastName} {usr.firstName} - {
                new Date(usr.dob).getDate() +' '+  months[ new Date(usr.dob).getMonth()] + ", " + (new Date(usr.dob).getFullYear() + ' year')
            }
            </p>)}
        </div>
        </>
    )
}

export default Birthdays