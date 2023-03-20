import React, { useEffect, useContext } from "react";

import { Page, Layout, Card, Banner, List } from "@shopify/polaris";
import "../assets/styles/index.css";

import SearchableTable from "../components/searchable-table/SearchableTable";
import SkeletonDummyPage from "../components/skeleton-dummy-page/SkeletonDummyPage";

import { search, buildSearchParameters } from "../constants/methods/search";
import { paginate } from "../helpers/paginate";
import { sorter } from "../helpers/sorter";

import * as actions from "../store/actions";
import { store } from "../store/store";

function Orders() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const loading = globalState.state.loading;
  const searchableLoading = globalState.state.searchable_loading;
  const ordersPerPage = globalState.state.orders_per_page;
  const orders = globalState.state.orders;
  const sortValue = globalState.state.sort_value;
  const headerRow = globalState.state.header_row;
  const errors = globalState.state.sync_errors;

  useEffect(() => {
    searchOrders();
  }, []);

  function dismissBanner() {
      dispatch(actions.setSyncErrors([]))
  }

  async function searchOrders(new_search_parameters, source = false) {
    const came_from_searchable = source;
    if (!came_from_searchable) {
      if (!loading) {
        dispatch(actions.setLoading(true));
      }
    } else {
      if (!searchableLoading) {
        dispatch(actions.setSearchableLoading(true));
      }
    }

    new_search_parameters = buildSearchParameters(new_search_parameters);
    await search(new_search_parameters)
      .then(response => {
        if (response.data.orders && response.data.orders.length != 0) {
          let response_orders = response.data.orders
          const sorted_orders = sorter(response_orders, sortValue)
          const paginated_orders = paginate(sorted_orders, ordersPerPage)
          dispatch(actions.setPaginatedOrders(paginated_orders));
          dispatch(actions.setOriginalOrders(response_orders))
          dispatch(actions.setCurrentPage(0));
          dispatch(actions.setNumberOfPages(paginated_orders.length));
          dispatch(actions.setNumberOfOrders(response_orders.length));
          dispatch(actions.setOrders(headerRow.concat(paginated_orders[0])));
          came_from_searchable
            ? dispatch(actions.setSearchableLoading(false))
            : dispatch(actions.setLoading(false));
        } else {
          dispatch(actions.setOrders([]));
          dispatch(actions.setLoading(false));
          dispatch(actions.setSearchableLoading(false));
        }
      })
      .catch(error => {
        console.log("Error....");
        console.log(error);
      });
  }

  if (loading) {
    return <SkeletonDummyPage></SkeletonDummyPage>;
  } else {
      const bannerVisible = errors && errors.length;
    return (
      <Page title="Orders" fullWidth>
        <Layout>
          <Layout.Section>
          {bannerVisible ?
          <Banner
            title="Sync Details:"
            onDismiss={dismissBanner}
            status="warning">
                <List>
                    {errors.map((error) => {
                    return (
                        <>
                        {error.invalid_address &&
                            <List.Item>
                                {`Order #${error.order_number} - Invalid address`}
                            </List.Item>
                        }
                        {error.sync_error &&
                            <List.Item>
                                There was an error syncing orders
                            </List.Item>
                        }
                        {error.package_error &&
                            <List.Item>
                                {`Order #${error.order_number} - Couldn't sync order`}
                            </List.Item>
                        }
                        </>
                    )
                    })}
                </List>
            </Banner> : null}
            <Card>
              <SearchableTable
                orders={orders}
                searchOrders={searchOrders}
                loading={loading}
              ></SearchableTable>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default Orders;
