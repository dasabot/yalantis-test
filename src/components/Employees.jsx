import React, { useState, useEffect } from "react";
import Birthdays from "./Birthdays";
import styled from "styled-components";
import { formatData } from "../utils/FormatData";
import { FetchUsersList } from "../api/users";

function Employees() {
  const [data, setData] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState(
    JSON.parse(localStorage.getItem("checkedUsers")) || []
  );

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const { data } = await FetchUsersList();
      setData(
        data.sort((a, b) => {
          const result = a.firstName.localeCompare(b.firstName);
          return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  const usersData = formatData(data),
    updateCheckedUsers = (e) => {
      let tmp = [...checkedUsers];
      console.log("tmp", tmp);

      if (e.target.checked) {
        tmp.push(data.find((u) => u.id === e.target.id));
      } else {
        tmp = tmp.filter((user) => user.id !== e.target.id);
      }

      localStorage.setItem("checkedUsers", JSON.stringify(tmp));
      setCheckedUsers(tmp);
    };

  return (
    <>
      {
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
                          <Input
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
      }

      <Birthdays checkedUsers={checkedUsers} />
    </>
  );
}

const EmployeesContainer = styled.div`
  width: 65%;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 60%;
  }

  @media only screen and (max-width: 480px) {
    width: 50%;
  }
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ListItems = styled.li`
  width: 25%;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 50%;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
  }

  ul {
    padding: 0;

    li {
      position: relative;

      @media only screen and (max-width: 480px) {
        font-size: 10pt;
      }
    }
  }

  h3 {
    @media only screen and (max-width: 480px) {
      font-size: 11pt;
    }
  }
`;

const Input = styled.input`
  position: absolute;
  right: 30%;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    right: 20%;
  }

  @media only screen and (max-width: 480px) {
    right: 15%;
  }
`;

export default Employees;
