import React, { useContext, useState } from "react";

import { ResourceList, Badge } from "@shopify/polaris";
import "./ResourceRow.css";

import OrderModal from "../order-modal/OrderModal";

import * as capitalize from "../../helpers/capitalize";

import * as actions from "../../store/actions";
import { store } from "../../store/store";
const moment = require("moment");

function ResourceRow(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const orders = globalState.state.orders;
  const [activeOrder, setActiveOrder] = useState({});
  const activeOrderId = globalState.state.active_order_id;
  //Generated randomly to re-render item after sync due to Polaris bug
  const randomKey = Math.random().toString(36).substring(7);

  let shortcutActions = [
    {
      content: "View more",
      accessibilityLabel: `View more for ${props.item.name} order`,
      url: "#",
      onClick: event => rowOnClick(event),
      id: props.item.id
    }
  ];

  function rowOnClick(event) {
    event.preventDefault();
    const order_id = parseInt(event.currentTarget.id);
    if (activeOrderId !== order_id) {
      console.log(order_id);
      orders.forEach(order => {
        if (order.id === order_id) {
          setActiveOrder(order);
        }
      });
      // dispatch(actions.setActiveOrder(order_to_show));
      dispatch(actions.setActiveOrderId(order_id));
    } else {
      setActiveOrder({});
      dispatch(actions.setActiveOrderId(0));
    }
  }

  function fulfillmentStatusFormatter(fulfillment_status) {
    let badge = "";
    switch (fulfillment_status) {
      case "fulfilled":
        badge = (
          <Badge status="success">
            {capitalize.capitalizeString(fulfillment_status)}
          </Badge>
        );
        break;
      case "unfulfilled":
        badge = (
          <Badge status="attention">
            {capitalize.capitalizeString(fulfillment_status)}
          </Badge>
        );
        break;
      default:
        badge = "";
        break;
    }
    return badge;
  }

  return (
    <div>
      {!_.isEmpty(activeOrder) && <OrderModal item={activeOrder}></OrderModal>}
      <ResourceList.Item
        id={props.item.id}
        key={randomKey}
        accessibilityLabel={`View details for ${props.item.name}`}
        name={props.item.name}
        shortcutActions={shortcutActions}
      >
        <div className="ResourceList-Row Data-OrderNumber">{props.item.name}</div>
        <div className="ResourceList-Row Data-DateOrdered">
          {moment(props.item.created_at).format("MM/DD/YY")}
        </div>
        <div className="ResourceList-Row Data-Customer">
          {props.item.customer
            ? props.item.customer.first_name + " " + props.item.customer.last_name
            : " "}{" "}
          <br></br>
          {props.item.email}
        </div>
        <div className="ResourceList-Row Data-FulfillmentStatus">
          {fulfillmentStatusFormatter(props.item.fulfillment_status)}
        </div>
        <div className="ResourceList-Row Data-Destination">
          {props.item.shipping_address ? props.item.shipping_address.address1 : ""}
        </div>
        <div className="ResourceList-Row Data-Amount">
          {"$" + parseFloat(props.item.total_price).toFixed(2)}
          <br></br>
          {props.item.currency}
        </div>
        <div className="ResourceList-Row Data-Synced">
          {props.item.limeloop_synced ? "Synced" : "Unsynced"}
        </div>
      </ResourceList.Item>
    </div>
  );
}

export default ResourceRow;
