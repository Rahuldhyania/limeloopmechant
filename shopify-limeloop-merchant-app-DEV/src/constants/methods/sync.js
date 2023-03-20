import { axiosInstance } from "../axios";
import Cookies from "js-cookie";
import { SyncParameters } from "../models/SyncParameters";

export async function sync(orders) {
    const shopOrigin = Cookies.get("shopOrigin");
    if (orders && orders.length) {
        let parameters = new SyncParameters();
        parameters.orders = orders;
        parameters.shopifyDomain = shopOrigin;
        return await axiosInstance.post("/shopify/sync-orders", parameters);
    }
}