import * as actionTypes from "./actions";

const initialState = {
  loading: true,
  searchable_loading: false,
  orders: [],
  paginated_orders: [],
  original_orders: [],
  number_of_pages: 0,
  number_of_orders: 0,
  current_page: 0,
  search_value: "",
  orders_per_page: 5, // TODO: Set 50 as default.
  sort_value: "ORDER_NUMBER_DESC",
  header_row: [{ id: 0, header: true }],
  fulfillment_status_value: "",
  selected_items: [],
  active_order: {},
  active_order_id: 0,
  params: {},
  sync_errors: []
};

import React, { createContext, useReducer } from "react";

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_LOADING:
        return {
          ...state,
          loading: action.payload.loading
        };
      case actionTypes.SET_SEARCHABLE_LOADING:
        return {
          ...state,
          searchable_loading: action.payload.searchable_loading
        };
      case actionTypes.SET_ORDERS:
        return {
          ...state,
          orders: action.payload.orders
        };
      case actionTypes.SET_ORIGINAL_ORDERS:
        return {
          ...state,
          original_orders: action.payload.original_orders
        };
      case actionTypes.SET_NUMBER_OF_ORDERS:
        return {
          ...state,
          number_of_orders: action.payload.number_of_orders
        };
      case actionTypes.SET_NUMBER_OF_PAGES:
        return {
          ...state,
          number_of_pages: action.payload.number_of_pages
        };
      case actionTypes.SET_CURRENT_PAGE:
        return {
          ...state,
          current_page: action.payload.current_page
        };
      case actionTypes.SET_SEARCH_VALUE:
        return {
          ...state,
          search_value: action.payload.search_value
        };
      case actionTypes.SET_ORDERS_PER_PAGE:
        return {
          ...state,
          orders_per_page: action.payload.orders_per_page
        };
      case actionTypes.SET_SORT_VALUE:
        return {
          ...state,
          sort_value: action.payload.sort_value
        };
      case actionTypes.SET_FULFILLMENT_STATUS_VALUE:
        return {
          ...state,
          fulfillment_status_value: action.payload.fulfillment_status_value
        };
      case actionTypes.SET_PAGINATED_ORDERS:
        return {
          ...state,
          paginated_orders: action.payload.paginated_orders
        };
      case actionTypes.SET_SELECTED_ITEMS:
        return {
          ...state,
          selected_items: action.payload.selected_items
        };
      case actionTypes.SET_ACTIVE_ORDER:
        return {
          ...state,
          active_order: action.payload.active_order
        };
      case actionTypes.SET_ACTIVE_ORDER_ID:
        return {
          ...state,
          active_order_id: action.payload.active_order_id
        };
        case actionTypes.SET_PARAMS:
        return {
          ...state,
          params: action.payload.params
        };
        case actionTypes.SET_SYNC_ERRORS:
        return {
            ...state,
            sync_errors: action.payload.sync_errors
        }
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
