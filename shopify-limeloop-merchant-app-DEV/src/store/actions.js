export const SET_LOADING = "SET_LOADING";
export const SET_SEARCHABLE_LOADING = "SET_SEARCHABLE_LOADING";
export const SET_ORDERS = "SET_ORDERS";
export const SET_ORIGINAL_ORDERS = "SET_ORIGINAL_ORDERS";
export const SET_NUMBER_OF_PAGES = "SET_NUMBER_OF_PAGES";
export const SET_NUMBER_OF_ORDERS = "SET_NUMBER_OF_ORDERS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const SET_ORDERS_PER_PAGE = "SET_ORDERS_PER_PAGE";
export const SET_SORT_VALUE = "SET_SORT_VALUE";
export const SET_FULFILLMENT_STATUS_VALUE = "SET_FULFILLMENT_STATUS_VALUE";
export const SET_PAGINATED_ORDERS = "SET_PAGINATED_ORDERS";
export const SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS";
export const SET_ACTIVE_ORDER = "SET_ACTIVE_ORDER";
export const SET_ACTIVE_ORDER_ID = "SET_ACTIVE_ORDER_ID";
export const SET_PARAMS = "SET_PARAMS";
export const SET_SYNC_ERRORS = "SET_SYNC_ERRORS"

export const setLoading = new_loading => ({
  type: SET_LOADING,
  payload: {
    loading: new_loading
  }
});

export const setSearchableLoading = new_searchable_loading => ({
  type: SET_SEARCHABLE_LOADING,
  payload: {
    searchable_loading: new_searchable_loading
  }
});

export const setOrders = new_orders => ({
  type: SET_ORDERS,
  payload: {
    orders: new_orders
  }
});

export const setOriginalOrders = new_original_orders => ({
  type: SET_ORIGINAL_ORDERS,
  payload: {
    original_orders: new_original_orders
  }
});

export const setNumberOfPages = new_number_of_pages => ({
  type: SET_NUMBER_OF_PAGES,
  payload: {
    number_of_pages: new_number_of_pages
  }
});

export const setNumberOfOrders = new_number_of_orders => ({
  type: SET_NUMBER_OF_ORDERS,
  payload: {
    number_of_orders: new_number_of_orders
  }
});

export const setCurrentPage = new_current_page => ({
  type: SET_CURRENT_PAGE,
  payload: {
    current_page: new_current_page
  }
});

export const setSearchValue = new_search_value => ({
  type: SET_SEARCH_VALUE,
  payload: {
    search_value: new_search_value
  }
});

export const setOrdersPerPage = new_orders_per_page => ({
  type: SET_ORDERS_PER_PAGE,
  payload: {
    orders_per_page: new_orders_per_page
  }
});

export const setSortValue = new_sort_value => ({
  type: SET_SORT_VALUE,
  payload: {
    sort_value: new_sort_value
  }
});

export const setFulfillmentStatusValue = new_fulfillment_status_value => ({
  type: SET_FULFILLMENT_STATUS_VALUE,
  payload: {
    fulfillment_status_value: new_fulfillment_status_value
  }
});

export const setPaginatedOrders = new_paginated_orders => ({
  type: SET_PAGINATED_ORDERS,
  payload: {
    paginated_orders: new_paginated_orders
  }
});

export const setSelectedItems = new_selected_items => ({
  type: SET_SELECTED_ITEMS,
  payload: {
    selected_items: new_selected_items
  }
});

export const setActiveOrder = new_active_order => ({
  type: SET_ACTIVE_ORDER,
  payload: {
    active_order: new_active_order
  }
});

export const setActiveOrderId = new_active_order_id => ({
  type: SET_ACTIVE_ORDER_ID,
  payload: {
    active_order_id: new_active_order_id
  }
});

export const setParams = new_params => ({
  type: SET_PARAMS,
  payload: {
    params: new_params
  }
});

export const setSyncErrors = sync_errors => ({
    type: SET_SYNC_ERRORS,
    payload: {
        sync_errors: sync_errors
    }
});
