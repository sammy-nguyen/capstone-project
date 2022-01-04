import React from "react";
import Account from "../components/Account";

const AccountPage = (props) => {
  return (
    <div>
      <Account
        isModalVisible={props.isModalVisible}
        setIsModalVisible={props.setIsModalVisible}
      />
    </div>
  );
};

export default AccountPage;
