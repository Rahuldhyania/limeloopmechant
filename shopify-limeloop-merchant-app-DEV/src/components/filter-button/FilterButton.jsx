import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Button,
  Icon,
  Popover,
  FormLayout,
  Select,
  DatePicker,
  RangeSlider,
  Checkbox
} from "@shopify/polaris";
import "./FilterButton.css";

import * as actions from "../../store/actions";
import { store } from "../../store/store";

const moment = require("moment");

function FilterButton(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [clearFilters, setClearFilters] = useState(false)

  const searchValue = globalState.state.search_value;
  const fulfillmentStatusValue = globalState.state.fulfillment_status_value;
  const searchOrders = props.searchOrders;

  useEffect(()=> {
    if(clearFilters) {
      handleFilterSubmit();
    }
  }, [clearFilters])

  /* Date period */
  const orderPeriodOptions = [
    { label: "Choose period", value: "today" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" }
  ];
  const [selected, setSelected] = useState("today");
  const handleSelectChange = useCallback(value => {
    setSelected(value);
  }, []);

  /* Date Picker */
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const [dateChanged, setDateChanged] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: now.getMonth(),
    year: now.getFullYear()
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(now),
    end: new Date(now)
  });
  const handleDateChange = (range) => {
    setSelectedDates(range);
    setDateChanged(true);
  }
  const handleMonthChange = useCallback((month, year) => {
    setDate({ month, year });
  }, []);
  /* Popover */
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = useCallback(() => {
    setPopoverActive(popoverActive => !popoverActive);
  }, []);
  /* # of Items Slider */
  const stepItems = 1;
  const initialValueItems = [0, stepItems];
  const prefixItems = "#";
  const minItems = 0;
  const maxItems = 10;
  const suffixItems = `${maxItems}+`;
  const [rangeValueItems, setRangeValueItems] = useState(initialValueItems);
  const [itemsChanged, setItemsChanged] = useState(false);
  const handleRangeSliderChangeItems = useCallback(value => {
      setRangeValueItems(value);
      setItemsChanged(true);
  }, []);

  /* Total weight Slider */
  const stepWeight = 10;
  const initialValueWeight = [0, stepWeight];
  const prefixWeight = "gr";
  const minWeight = 0;
  const maxWeight = 1500;
  const [rangeValueWeight, setRangeValueWeight] = useState(initialValueWeight);
  const [weightChanged, setWeightChanged] = useState(false);
  const handleRangeSliderChangeWeight = useCallback(value => {
      setRangeValueWeight(value);
      setWeightChanged(true);
  }, []);

  /* Amount Slider */
  const stepAmount = 10;
  const initialValueAmount = [0, stepAmount];
  const prefixAmount = "$";
  const minAmount = 0;
  const maxAmount = 500;
  const suffixAmount = `${maxAmount}+`;
  const [rangeValueAmount, setRangeValueAmount] = useState(initialValueAmount);
  const [amountChanged, setAmountChanged] = useState(false);
  const handleRangeSliderChangeAmount = useCallback(value => {
      setRangeValueAmount(value);
      setAmountChanged(true);
  }, []);
  /* US Only */
  const [checked, setChecked] = useState(false);
  const [checkedChanged, setCheckedChanged] = useState(false);
  const handleChange = useCallback(newChecked => {
    setCheckedChanged(true);
    setChecked(newChecked);
  }, []);

  const handleClearFilters = () => {
    setRangeValueAmount(initialValueAmount);
    setAmountChanged(false);
    setRangeValueItems(initialValueItems);
    setItemsChanged(false);
    setRangeValueWeight(initialValueWeight);
    setWeightChanged(false);
    setChecked(false);
    setCheckedChanged(false);
    setSelected("today");
    setSelectedDates({
        start: new Date(now),
        end: new Date(now)
    });
    setDateChanged(false);
    setClearFilters(true);
  }

  const activator = (
    <>
      <Button onClick={togglePopoverActive}>
        <Icon source="<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='971.986px' height='971.986px' viewBox='0 0 971.986 971.986' style='enable-background:new 0 0 971.986 971.986;' xml:space='preserve'><g><path d='M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z'/></g></svg>"></Icon>
        <div className="FilterButton-Text">FILTER</div>
      </Button>
      <Button onClick={handleClearFilters}>
        <Icon source="<svg id='Capa_1' enable-background='new 0 0 512 512' height='512' viewBox='0 0 512 512' width='512' xmlns='http://www.w3.org/2000/svg'><g><path d='m215.546 85.327h-162.264c-18.073 0-28.679 20.379-18.31 35.187.133.199-3.448-4.682 130.024 177.006 5.921 8.587 4.149-.599 4.149 190.987 0 19.245 21.993 30.358 37.542 18.791 57.536-43.372 71.516-48.257 71.516-70.955 0-133.909-1.721-130.311 4.149-138.823l27.851-37.923c-70.082-25.496-112.087-99.608-94.657-174.27z'/><path d='m281.951 30.166c-75.076 67.31-38.685 187.35 55.962 206.05 75.479 15.948 143.193-43.867 143.193-116.945 0-102.594-122.364-157.159-199.155-89.105zm118.529 106.804c9.515 9.466 2.715 25.676-10.603 25.676-8.014 0-10.022-3.79-28.462-22.158-18.064 17.984-20.27 22.158-28.472 22.158-13.349 0-20.063-16.264-10.603-25.676l17.769-17.699-17.769-17.699c-14.107-14.035 7.142-35.322 21.216-21.297l17.859 17.779 17.849-17.779c14.074-14.025 35.331 7.254 21.216 21.297l-17.769 17.699z'/></g></svg>"></Icon>
        <div className="FilterButton-Text">CLEAR</div>
      </Button>
    </>
  );

  const handleFilterSubmit = function () {
    dispatch(actions.setSearchableLoading(true));
    let params = {
      search_value: searchValue,
      fulfillment_status: fulfillmentStatusValue,
      filters: {
        order_period: selected !== "today" ? selected : 0,
        order_dates: {
          from: clearFilters || !dateChanged ? "" : selectedDates.start,
          to: clearFilters || !dateChanged ? "" : selectedDates.end
        },
        number_items: {
          min: itemsChanged ? rangeValueItems[0] : 0,
          max: itemsChanged ? rangeValueItems[1] : 0,
          filterByMinimum: rangeValueItems[1] == maxItems
        },
        weight: {
          min: weightChanged ? rangeValueWeight[0] : 0,
          max: weightChanged ? rangeValueWeight[1] : 0
        },
        amount: {
          min: amountChanged ? rangeValueAmount[0] : 0,
          max: amountChanged ? rangeValueAmount[1] : 0,
          filterByMinimum: rangeValueAmount[1] == maxAmount
        },
        us_only: checkedChanged ? checked : false
      }
    };
    dispatch(actions.setParams(params));
    searchOrders(params, true);
    setClearFilters(false);
  };

  return (
    <div className="FilterButton-Container">
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          <Select
            label="Order period:"
            options={orderPeriodOptions}
            onChange={handleSelectChange}
            value={selected}
          />
          <p>Order Dates:</p>
          <DatePicker
            month={month}
            year={year}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            disableDatesAfter={now}
            allowRange
          />
          <RangeSlider
            output
            label="# of items"
            value={rangeValueItems}
            prefix={prefixItems}
            suffix={suffixItems}
            min={minItems}
            max={maxItems}
            step={stepItems}
            onChange={handleRangeSliderChangeItems}
          />
          <RangeSlider
            output
            label="Total weight (grams)"
            value={rangeValueWeight}
            prefix={prefixWeight}
            min={minWeight}
            max={maxWeight}
            step={stepWeight}
            onChange={handleRangeSliderChangeWeight}
          />
          <RangeSlider
            output
            label="Amount"
            value={rangeValueAmount}
            prefix={prefixAmount}
            suffix={suffixAmount}
            min={minAmount}
            max={maxAmount}
            step={stepAmount}
            onChange={handleRangeSliderChangeAmount}
          />
          <Checkbox label="US Only?" checked={checked} onChange={handleChange} />
          <Button onClick={handleFilterSubmit}>Apply</Button>
        </FormLayout>
      </Popover>
    </div>
  );
}

export default FilterButton;
