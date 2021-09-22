import _ from "lodash";
import React from "react";

import Appointment from "../../interfaces/Appointment";
import AppointmentRecord from "../../components/AppointmentRecord";

export default function Appointments(props: { records: Array<Appointment> }) {
  const records = _.groupBy(props.records, (r) => r.status);
  const pendingRecords = records["PENDING"] || [];
  const reviewRecords = records["NEED_REVIEW"] || [];
  const completedRecords = records["COMPLETED"] || [];

  return (
    <section className="appointments">
      <div className="column pending" hidden={_.isEmpty(pendingRecords)}>
        <h3>Task</h3>
        {pendingRecords.map((r) => AppointmentRecord(r))}
      </div>
      <div className="column review" hidden={_.isEmpty(reviewRecords)}>
        <h3>Review</h3>
        {reviewRecords.map((r) => AppointmentRecord(r))}
      </div>
      <div className="column completed" hidden={_.isEmpty(completedRecords)}>
        <h3>Done</h3>
        {completedRecords.map((r) => AppointmentRecord(r))}
      </div>
    </section>
  );
}
