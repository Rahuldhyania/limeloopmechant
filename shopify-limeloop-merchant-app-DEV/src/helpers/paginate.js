export function paginate(unpaginated_orders, orders_by_page) {
  let result = [];
  for (let i = 0; i < unpaginated_orders.length; i += orders_by_page) {
    let chunk = unpaginated_orders.slice(i, i + orders_by_page);
    result.push(chunk);
  }
  return result;
}
