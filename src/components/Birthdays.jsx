import React from "react";
import styled from "styled-components";

function Birthdays({ checkedUsers }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const users =
    checkedUsers &&
    checkedUsers
      .map((user) => {
        return { ...user, dob: new Date(user.dob) };
      })
      .sort((a, b) => new Date(a.dob) - new Date(b.dob));

  function renderBirthdays() {
    return (
      <>
        <h2>Employees birthday</h2>
        <ul>
          {users &&
            months.map((month, index) => {
              const usersBornThisMonth = users.filter(
                (user) => user.dob.getMonth() === index
              );
              if (!usersBornThisMonth.length) return null;
              let tmp = [];
              tmp.push(<h3>{month}</h3>);
              usersBornThisMonth.forEach((user) => {
                tmp.push(
                  <li key={`birthday${user.id}`}>{`${user.lastName} ${
                    user.firstName
                  } - ${new Date(user.dob).getDate()} ${
                    months[new Date(user.dob).getMonth()]
                  }, ${new Date(user.dob).getFullYear()} year`}</li>
                );
              });
              return tmp;
            })}
        </ul>
      </>
    );
  }

  return <BirthdaysContainer>{renderBirthdays()}</BirthdaysContainer>;
}

const BirthdaysContainer = styled.div`
  width: 35%;
  position: relative;

  li {
    list-style-type: disc;
  }

  h2 {
    position: relative;
  }

  h2::after {
    content: "";
    width: 300px;
    height: 1px;
    position: absolute;
    background: black;
    z-index: 9999;
    top: 47px;
    right: 112px;
  }

  &::before {
    position: absolute;
    content: "";
    height: 90%;
    width: 2px;
    background: #c8c8c8;
    top: 69px;
  }
`;
export default Birthdays;
