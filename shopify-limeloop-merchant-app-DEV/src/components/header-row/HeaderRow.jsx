import React from "react";

import { ResourceList } from "@shopify/polaris";
import "./HeaderRow.css";

function HeaderRow() {
  return (
    <div className="Header-Row">
      <ResourceList.Item id="0">
        <div className="ResourceList-Header Header-OrderNumber">ORDER NUMBER</div>
        <div className="ResourceList-Header Header-DateOrdered">ORDER DATE</div>
        <div className="ResourceList-Header Header-Customer">CUSTOMER</div>
        <div className="ResourceList-Header Header-FulfillmentStatus">
          FULFILLMENT
        </div>
        <div className="ResourceList-Header Header-Destination">DESTINATION</div>
        <div className="ResourceList-Header Header-Amount">AMOUNT</div>
        <div className="ResourceList-Header Header-Synced">SYNCED</div>
      </ResourceList.Item>
    </div>
  );
}

export default HeaderRow;
