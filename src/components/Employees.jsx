import React, { useState, useEffect } from "react";
import Birthdays from "./Birthdays";
import styled from "styled-components";
import axios from "axios";

function Employees() {
  const [data, setData] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState(
    JSON.parse(window.localStorage.getItem("checkedUsers")) || []
  );
  const letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

  useEffect(() => {
    axios
      .get("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then((json) => {
        setData(
          json.data.sort((a, b) => {
            const result = a.firstName.localeCompare(b.firstName);
            return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
          })
        );
      });
  }, []);

  const usersData = letters.reduce((acc, letter) => {
    return {
      ...acc,
      [letter]: data.filter((user) => user.lastName[0] === letter),
    };
  }, {});

  const updateCheckedUsers = (e) => {
    let tmp = [...checkedUsers];

    if (e.target.checked) {
      tmp.push(data.find((u) => u.id === e.target.id));
    } else {
      tmp = tmp.filter((user) => user.id !== e.target.id);
    }

    window.localStorage.setItem("checkedUsers", JSON.stringify(tmp));
    setCheckedUsers(tmp);
  };

  function renderUsers() {
    return (
      <EmployeesContainer>
        <h2>Employees</h2>
        <Lists>
          {Object.entries(usersData).map(([letter, users]) => {
            return (
              <ListItems key={letter}>
                <h3>{letter}</h3>
                <ul>
                  {users.length > 0 ? (
                    users.map((usr) => (
                      <li key={usr.id}>
                        <label htmlFor={usr.id}>
                          {usr.lastName} {usr.firstName}
                        </label>
                        <input
                          onChange={updateCheckedUsers}
                          id={usr.id}
                          type="checkbox"
                          checked={checkedUsers.find(
                            (checkedUser) => checkedUser.id === usr.id
                          )}
                        />
                      </li>
                    ))
                  ) : (
                    <p>-----</p>
                  )}
                </ul>
              </ListItems>
            );
          })}
        </Lists>
      </EmployeesContainer>
    );
  }

  return (
    <>
      {renderUsers()}

      <Birthdays checkedUsers={checkedUsers} />
    </>
  );
}

const EmployeesContainer = styled.div`
  width: 65%;
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ListItems = styled.li`
  width: 25%;

  ul {
    padding: 0;

    li {
      position: relative;

      input {
        position: absolute;
        right: 30%;
      }
    }
  }
`;

export default Employees;
