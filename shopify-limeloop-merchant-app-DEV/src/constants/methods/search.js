import { SearchParameters } from "../models/SearchParameters";
import { axiosInstance } from "../axios";
import Cookies from "js-cookie";

export async function search(new_search_parameters) {
  const shopOrigin = Cookies.get("shopOrigin");
  let search_params = new SearchParameters();
  if (new_search_parameters) {
    search_params = buildSearchParameters(new_search_parameters);
  }
  search_params.shopify_domain = shopOrigin;
  return await axiosInstance.post("/shopify/orders", search_params);
}

export function buildSearchParameters(new_search_parameters) {
  let search_params_to_return = new SearchParameters();
  for (var key in new_search_parameters) {
    if (search_params_to_return.hasOwnProperty(key)) {
      search_params_to_return[key] = new_search_parameters[key];
    }
  }
  return search_params_to_return;
}
