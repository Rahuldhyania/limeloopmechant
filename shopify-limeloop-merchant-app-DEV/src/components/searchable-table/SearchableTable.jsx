import React, { useState, useContext } from "react";

import { ResourceList, Button, Tabs } from "@shopify/polaris";
import "./SearchableTable.css";

import HeaderRow from "../header-row/HeaderRow";
import ResourceRow from "../resource-row/ResourceRow";
import FilterButton from "../filter-button/FilterButton";
import CustomPagination from "../custom-pagination/CustomPagination";

import { sync } from "../../constants/methods/sync";
import { paginate } from "../../helpers/paginate";
import { sorter } from "../../helpers/sorter";

import * as actions from "../../store/actions";
import { store } from "../../store/store";

function SearchableTable(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const currentPage = globalState.state.current_page;
  const itemsCurrentPage = globalState.state.orders;
  const searchableLoading = globalState.state.searchable_loading;
  const searchValue = globalState.state.search_value;
  const fulfillmentStatusValue = globalState.state.fulfillment_status_value;
  const numberOfPages = globalState.state.number_of_pages;
  const numberOfOrders = globalState.state.number_of_orders;
  const sortValue = globalState.state.sort_value;
  const originalOrders = globalState.state.original_orders;
  const ordersPerPage = globalState.state.orders_per_page;
  const headerRow = globalState.state.header_row;
  const selectedItems = globalState.state.selected_items;
  const stateParams = globalState.state.params;

  const [selectAll, setSelectAll] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeoutHandle, setTimeoutHandle] = useState(0);

  const searchOrders = props.searchOrders;
  const tabs = [
    {
      id: "all",
      content: "All",
      accessibilityLabel: "All",
      panelID: "all"
    },
    {
      id: "fulfilled",
      content: "Fulfilled",
      accessibilityLabel: "Fulfilled",
      panelID: "Fulfilled"
    },
    {
      id: "unfulfilled",
      content: "Unfulfilled",
      accessibilityLabel: "Unfulfilled",
      panelID: "Unfulfilled"
    }
  ];
  const sortOptions = [
    { label: "Order number (ascending)", value: "ORDER_NUMBER_ASC" },
    { label: "Order number (descending)", value: "ORDER_NUMBER_DESC" },
    { label: "Order date (oldest first)", value: "ORDER_DATE_ASC" },
    { label: "Order date (newest first)", value: "ORDER_DATE_DESC" },
    { label: "Customer name (A-Z)", value: "CUSTOMER_NAME_ASC" },
    { label: "Customer name (Z-A)", value: "CUSTOMER_NAME_DESC" },
    { label: "Fulfillment (A-Z)", value: "FULFILLMENT_ASC" },
    { label: "Fulfillment (Z-A)", value: "FULFILLMENT_DESC" },
    { label: "Amount (low to high)", value: "AMOUNT_ASC" },
    { label: "Amount (high to low)", value: "AMOUNT_DESC" },
    { label: "Synced (A-Z)", value: "SYNCED_ASC" },
    { label: "Synced (Z-A)", value: "SYNCED_DESC" }
  ];
  const resourceName = { singular: "order", plural: "orders" };

  function renderItem(item) {
    if (item.header) {
      return <HeaderRow></HeaderRow>;
    } else {
      return <ResourceRow item={item}></ResourceRow>;
    }
  }

  function handleSearchChange(search_value, tab_change = false) {
    dispatch(actions.setSearchableLoading(true));
    let new_params = stateParams;
    tab_change = tab_change === true;
    if (tab_change) {
      dispatch(actions.setFulfillmentStatusValue(search_value));
      new_params.search_value = searchValue;
      new_params.fulfillment_status = search_value;
    } else {
      dispatch(actions.setSearchValue(search_value));
        new_params.search_value = search_value,
        new_params.fulfillment_status = fulfillmentStatusValue
    }

    if (timeoutHandle) {
      setTimeoutHandle(clearTimeout(timeoutHandle));
    }

    setTimeoutHandle(
      setTimeout(() => {
        dispatch(actions.setParams(new_params));
        searchOrders(new_params, true);
      }, 1500)
    );
  }

  function handleSelectionChange(new_selected_items) {
    let currentSelectedItems = selectedItems,
      tempSelectedItems = selectedItems;
    if (new_selected_items.includes("0")) {
      if (new_selected_items.length < currentSelectedItems.length) {
        let index = new_selected_items.indexOf("0");
        if (index > -1) {
          tempSelectedItems = new_selected_items;
          tempSelectedItems.splice(index, 1);
        }
        setSelectAll(false);
      } else {
        tempSelectedItems.push("0");
        props.orders.forEach((element, index) => {
          if (index > 0 && !currentSelectedItems.includes(element.id)) {
            tempSelectedItems.push(element.id);
          }
        });
        setSelectAll(true);
      }
    } else {
      if (selectAll) {
        tempSelectedItems = [];
        setSelectAll(false);
      } else {
        tempSelectedItems = new_selected_items;
      }
    }
    dispatch(actions.setSelectedItems(tempSelectedItems));
  }

  async function syncOrders() {
    if (!searchableLoading) {
      dispatch(actions.setSearchableLoading(true));
    }
    let orders_to_sync = [];
    if (selectedItems.length > 0) {
      let index = selectedItems.indexOf("0") || selectedItems.indexOf(0);
      if (index != -1) {
        selectedItems.splice(index, 1);
      }
      itemsCurrentPage.forEach(order => {
        if (selectedItems.includes(order.id)) {
          orders_to_sync.push(order);
        }
      });
      dispatch(actions.setSyncErrors([]))
      await sync(orders_to_sync)
      .then(async response => {
        searchOrders(stateParams, true)
        if(response.data && response.data.errors && response.data.errors.length) {
            dispatch(actions.setSyncErrors(response.data.errors))
        }
      })
      .catch(error => {
        console.log("Error....");
        console.log(error);
        dispatch(actions.setSyncErrors([{sync_error: true}]))
        dispatch(actions.setSearchableLoading(false));
      });
    }
  }

  function handleSortChange(new_sort_value) {
    if (new_sort_value === undefined) {
      new_sort_value = sortValue;
    }
    const sorted_orders = sorter(originalOrders, new_sort_value);
    const paginated_orders = paginate(sorted_orders, ordersPerPage);
    dispatch(actions.setPaginatedOrders(paginated_orders));
    dispatch(actions.setOrders(headerRow.concat(paginated_orders[currentPage])));
    dispatch(actions.setSortValue(new_sort_value));
  }

  function handleTabChange(selected_tab_index) {
    const new_search_value =
      selected_tab_index === 0 ? "" : tabs[selected_tab_index].id;
    setSelectedTab(selected_tab_index);
    handleSearchChange(new_search_value, true);
  }

  function filterControl() {
    return (
      <div className="Filters-Container">
        <FilterButton searchOrders={searchOrders}></FilterButton>
        <ResourceList.FilterControl
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <div className="SyncOrders-Container">
          <Button primary disabled={selectedItems.length === 0 || searchableLoading} onClick={syncOrders}>
            SYNC ORDERS
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="Resource-List-Container">
      <div
        className={`Tabs-Container ${
          selectedItems.length === 0 ? "" : "disabled-tabs"
        }`}
      >
        <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}></Tabs>
      </div>
      <ResourceList
        resourceName={resourceName}
        selectedItems={selectedItems}
        onSelectionChange={handleSelectionChange}
        sortOptions={sortOptions}
        sortValue={sortValue}
        renderItem={renderItem}
        items={itemsCurrentPage.length === 1 ? [] : itemsCurrentPage}
        loading={searchableLoading}
        totalItemsCount={numberOfOrders}
        filterControl={filterControl()}
        selectable={true}
        showHeader={false}
        onSortChange={selected => {
          handleSortChange(selected);
        }}
      />

      <CustomPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        resourceLength={itemsCurrentPage}
      ></CustomPagination>
    </div>
  );
}

export default SearchableTable;
