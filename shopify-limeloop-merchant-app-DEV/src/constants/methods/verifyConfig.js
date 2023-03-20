import { axiosInstance } from "../axios";
import Cookies from "js-cookie";

export async function verifyConfig() {
    const shopifyDomain = Cookies.get("shopOrigin");
    return await axiosInstance.get(`/shopify/verify-config/${shopifyDomain}`);
}