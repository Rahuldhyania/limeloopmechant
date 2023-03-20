import React, { useState, useEffect, useContext } from "react";

import { Modal, DataTable } from "@shopify/polaris";

import * as actions from "../../store/actions";
import { store } from "../../store/store";

const moment = require("moment");
const _ = require("lodash");

function OrderModal(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const propsActiveOrder = props.item;
  // const activeOrder = globalState.state.active_order;
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    buildRows();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(actions.setActiveOrder({}));
      dispatch(actions.setActiveOrderId(0));
      setRows([]);
      setOpen(false);
    };
  }, []);

  function buildRows() {
    let rows = [];
    console.log(propsActiveOrder);
    if (!_.isEmpty(propsActiveOrder)) {
      let created_at = moment(propsActiveOrder.created_at).format("MM/DD/YY");
      propsActiveOrder.line_items.forEach(item => {
        rows.push([created_at, item.title, item.grams + " grams"]);
        setRows(rows);
        setOpen(true);
      });
    }
  }

  function onClose() {
    setRows([]);
    setOpen(false);
    dispatch(actions.setActiveOrder({}));
    dispatch(actions.setActiveOrderId(0));
  }

  return (
    <Modal open={open} title="Order Items" onClose={onClose}>
      <Modal.Section>
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Date", "Item Name", "Item Weight"]}
          rows={rows}
        />
      </Modal.Section>
    </Modal>
  );
}

export default OrderModal;
