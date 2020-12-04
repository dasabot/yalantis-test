import React from "react";
import styled from "styled-components";
import { months } from "../utils/contants";

function Birthdays({ checkedUsers }) {
  const users =
    checkedUsers &&
    checkedUsers
      .map((user) => {
        return { ...user, dob: new Date(user.dob) };
      })
      .sort((a, b) => new Date(a.dob) - new Date(b.dob));

  return (
    <BirthdaysContainer>
      {
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
                tmp.push(<h3 key={`month${index}`}>{month}</h3>);
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
      }
    </BirthdaysContainer>
  );
}

const BirthdaysContainer = styled.div`
  width: 35%;
  position: relative;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 40%;
  }

  @media only screen and (max-width: 480px) {
    width: 50%;
  }

  li {
    list-style-type: disc;

    @media only screen and (max-width: 480px) {
      font-size: 10pt;
    }
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      right: 25px;
      width: 250px;
    }

    @media only screen and (max-width: 480px) {
      width: 170px;
      right: 15px;
      top: 30px;
    }
  }

  &::before {
    position: absolute;
    content: "";
    height: 90%;
    width: 2px;
    background: #c8c8c8;
    top: 75px;

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      height: 90%;
    }

    @media only screen and (max-width: 480px) {
      height: 95%;
    }
  }

  h3 {
    @media only screen and (max-width: 480px) {
      font-size: 11pt;
    }
  }
`;

export default Birthdays;
