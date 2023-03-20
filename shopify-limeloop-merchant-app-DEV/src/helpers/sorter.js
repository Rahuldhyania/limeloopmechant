export function sorter(unsortedItems, sortValue) {
  let sortedItems = [];
  let headerRow;
  if (unsortedItems.length > 0) {
    if (unsortedItems[0].header === true) {
      headerRow = unsortedItems.shift();
    }
    switch (sortValue) {
      case "ORDER_NUMBER_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.name;
          const valB = rowB.name;
          return valA < valB ? -1 : valA > valB ? 1 : 0;
        });
        break;
      case "ORDER_NUMBER_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.name;
          const valB = rowB.name;
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        });
        break;
      case "ORDER_DATE_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.created_at;
          const valB = rowB.created_at;
          return valA < valB ? -1 : valA > valB ? 1 : 0;
        });
        break;
      case "ORDER_DATE_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.created_at;
          const valB = rowB.created_at;
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        });
        break;
      case "CUSTOMER_NAME_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.customer
            ? rowA.customer.first_name + " " + rowA.customer.last_name
            : "";
          const valB = rowB.customer
            ? rowB.customer.first_name + " " + rowB.customer.last_name
            : "";
          return valA < valB ? -1 : valA > valB ? 1 : 0;
        });
        break;
      case "CUSTOMER_NAME_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.customer
            ? rowA.customer.first_name + " " + rowA.customer.last_name
            : "";
          const valB = rowB.customer
            ? rowB.customer.first_name + " " + rowB.customer.last_name
            : "";
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        });
        break;
      case "FULFILLMENT_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA =
            rowA.fulfillment_status === null ? "" : rowA.fulfillment_status;
          const valB =
            rowB.fulfillment_status === null ? "" : rowB.fulfillment_status;
          return valA < valB ? -1 : valA > valB ? 1 : 0;
        });
        break;
      case "FULFILLMENT_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA =
            rowA.fulfillment_status === null ? "" : rowA.fulfillment_status;
          const valB =
            rowB.fulfillment_status === null ? "" : rowB.fulfillment_status;
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        });
        break;
      case "AMOUNT_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = parseFloat(rowA.total_price);
          const valB = parseFloat(rowB.total_price);
          return valA - valB;
        });
        break;
      case "AMOUNT_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = parseFloat(rowA.total_price);
          const valB = parseFloat(rowB.total_price);
          return valB - valA;
        });
        break;
      case "SYNCED_ASC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.limeloop_synced;
          const valB = rowB.limeloop_synced;
          return valA === valB ? 0 : valA ? -1 : 1;
        });
        break;
      case "SYNCED_DESC":
        sortedItems = unsortedItems.sort((rowA, rowB) => {
          const valA = rowA.limeloop_synced;
          const valB = rowB.limeloop_synced;
          return valA === valB ? 0 : valA ? 1 : -1;
        });
      default:
        sortedItems = unsortedItems;
        break;
    }
  }

  if (headerRow !== undefined) {
    sortedItems.unshift(headerRow);
  }

  return sortedItems;
}
