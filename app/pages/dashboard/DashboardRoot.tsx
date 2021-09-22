import _ from "lodash";
import React, { useReducer } from "react";

import SidePanel from "./SidePanel";
import Appointments from "./Appointments";
import json from "./data.json";
import Appointment from "../../interfaces/Appointment";
import Filters from "../../interfaces/Filters";

function dashboardReducer(
  state: Record<string, any>,
  mutate: (nextState: Record<string, any>) => void
) {
  const nextState = _.clone(state);
  mutate(nextState);
  return nextState;
}

export default function DashboardRoot() {
  // dispatch: Dispatch<(nextState: Record<string, any>) => void>;
  const [state, dispatch] = useReducer(dashboardReducer, {
    account: json.data.account,
    records: json.data.allNotes.edges,
    visibleRecords: json.data.allNotes.edges,
    filters: {
      keyword: "",
      selectedYear: -1,
      selectedMonth: -1,
      selectedTypes: []
    },
    appointmentTypes: [
      { value: "TYPE_A", label: "TypeA" },
      { value: "TYPE_B", label: "TypeB" },
      { value: "TYPE_C", label: "TypeC" }
    ]
  });

  return (
    <>
      <SidePanel
        filters={state.filters}
        appointmentTypes={state.appointmentTypes}
        updateFilters={updateFilters}
      />
      <Appointments records={state.visibleRecords} />
    </>
  );

  function updateFilters(filters: Filters) {
    let visibleRecords = state.records;

    if (filters.keyword.length > 0) {
      const re = new RegExp(filters.keyword, "i");
      visibleRecords = visibleRecords.filter((r: Appointment) => {
        const patientName = `${r.patient.account.firstName} ${r.patient.account.lastName}`;
        return re.test(patientName);
      });
    }

    if (filters.selectedYear > -1) {
      visibleRecords = visibleRecords.filter((r: Appointment) => {
        const startDate = new Date(r.serviceStart);
        const startDateInRange =
          startDate.getFullYear() == filters.selectedYear &&
          startDate.getMonth() == filters.selectedMonth;
        const endDate = new Date(r.serviceEnd);
        const endDateInRange =
          endDate.getFullYear() == filters.selectedYear &&
          endDate.getMonth() == filters.selectedMonth;
        return startDateInRange || endDateInRange;
      });
    }

    if (!_.isEmpty(filters.selectedTypes)) {
      visibleRecords = visibleRecords.filter((r: Appointment) => {
        return _.find(filters.selectedTypes, (f) => f.value == r.type);
      });
    }

    dispatch((state) => {
      state.filters = filters;
      state.visibleRecords = visibleRecords;
    });
  }
}
