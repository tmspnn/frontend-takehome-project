import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import React from "react";
import Select from "react-select";

import Filters from "../../interfaces/Filters";

export default function SidePanel(props: {
  filters: Filters;
  appointmentTypes: Array<{ type: string; name: string }>;
  updateFilters: (filters: Filters) => void;
}) {
  const searchBar = (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange={onKeyword} />
      <i className="icon-search"></i>
    </div>
  );

  const periodSelector = (
    <div className="period-selector">
      <h3>PERIOD</h3>
      <div className="calendar">
        <Datetime
          initialViewMode={"months"}
          closeOnSelect={true}
          dateFormat="YYYY-MM"
          timeFormat={false}
          onChange={onDate}
        />
        <i className="icon-calendar"></i>
      </div>
    </div>
  );

  const appointmentTypesSelector = (
    <div className="appointment-types-selector">
      <h3>TYPE OF APPOINTMENT</h3>
      <div className="select">
        <Select
          placeholder={"All"}
          options={props.appointmentTypes}
          isMulti={true}
          onChange={onAppointmentTypes as any}
          styles={{
            control: (base) => ({
              ...base,
              border: 0,
              boxShadow: "none",
              minHeight: "2rem"
            })
          }}></Select>
      </div>
    </div>
  );

  return (
    <section className="side-panel">
      {searchBar}
      {periodSelector}
      {appointmentTypesSelector}
    </section>
  );

  function onKeyword(e: React.ChangeEvent<HTMLInputElement>) {
    props.filters.keyword = e.target.value.trim();
    notify();
  }

  function onDate(date: any) {
    props.filters.selectedYear = date.year();
    props.filters.selectedMonth = date.month();
    notify();
  }

  function onAppointmentTypes(types: Array<{ value: string; label: string }>) {
    props.filters.selectedTypes = types;
    notify();
  }

  function notify() {
    props.updateFilters(props.filters);
  }
}
