export class SearchParameters {
  constructor() {
    this.search_value = "";
    this.fulfillment_status = "";
    this.filters = {
      order_period: 0,
      order_dates: {
        from: "",
        to: ""
      },
      number_items: {
        min: 0,
        max: 0,
        filterByMinimum: false
      },
      weight: {
        min: 0,
        max: 0
      },
      amount: {
        min: 0,
        max: 0,
        filterByMinimum: false
      },
      us_only: false
    };
    this.shopify_domain = "";
  }
}
