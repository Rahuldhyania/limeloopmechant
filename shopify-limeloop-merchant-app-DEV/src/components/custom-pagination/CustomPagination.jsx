import React, { useCallback, useContext } from "react";

import { Pagination, Select } from "@shopify/polaris";
import "./CustomPagination.css";

import { paginate } from "../../helpers/paginate";
import { sorter } from "../../helpers/sorter";

import * as actions from "../../store/actions";
import { store } from "../../store/store";

function CustomPagination() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const ordersPerPage = globalState.state.orders_per_page;
  const sortValue = globalState.state.sort_value;
  const originalOrders = globalState.state.original_orders;
  const headerRow = globalState.state.header_row;
  const numberOfPages = globalState.state.number_of_pages;
  const paginatedOrders = globalState.state.paginated_orders;
  const currentPage = globalState.state.current_page;
  const options = [
    { label: "5", value: 5 }, // TODO: Remove this.
    { label: "50", value: 50 },
    { label: "75", value: 75 },
    { label: "100", value: 100 }
  ];

  const handleSelectChange = useCallback(function (value) {
    value = parseInt(value);
    dispatch(actions.setOrdersPerPage(value));
    dispatch(actions.setCurrentPage(0));
    updateOrdersToShow(value);
  }, []);

  function updateOrdersToShow(orders_per_page) {
    const sorted_orders = sorter(originalOrders, sortValue);
    const paginated_orders = paginate(sorted_orders, orders_per_page);
    dispatch(actions.setNumberOfPages(paginated_orders.length))
    dispatch(actions.setOrders(headerRow.concat(paginated_orders[0])));
  }

  function onPrevOrNext(new_page) {
    dispatch(actions.setCurrentPage(new_page));
    dispatch(actions.setOrders(headerRow.concat(paginatedOrders[new_page])));
  }

  return (
    <div className="Pagination-Container">
      <div class="Select-Container">
        <div className="Select-Text">Rows per page:</div>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={ordersPerPage}
        ></Select>
      </div>

      <Pagination
        hasPrevious={currentPage !== 0}
        hasNext={currentPage !== numberOfPages - 1}
        onPrevious={() => {
          onPrevOrNext(currentPage - 1);
        }}
        onNext={() => {
          onPrevOrNext(currentPage + 1);
        }}
      />
    </div>
  );
}

export default CustomPagination;
