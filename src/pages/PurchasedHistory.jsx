import { PropertySafetyFilled } from "@ant-design/icons";
import React from "react";
import Purchased from "../components/Purchased";

const PurchasedHistory = (props) => {
  return (
    <div>
      <Purchased user={props.user} />
    </div>
  );
};

export default PurchasedHistory;
