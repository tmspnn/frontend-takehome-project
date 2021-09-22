import _ from "lodash";
import dayjs from "dayjs";
import React from "react";

import Appointment from "../interfaces/Appointment";

export default function AppointmentRecord(props: Appointment) {
  const patientName = `${props.patient.account.firstName} ${props.patient.account.lastName}`;
  const signeeName = _.isEmpty(props.signee)
    ? ""
    : `${props.signee.account.firstName} ${props.signee.account.lastName}`;
  const supervisorName = _.isEmpty(props.supervisor)
    ? ""
    : `${props.supervisor.account.firstName} ${props.supervisor.account.lastName}`;
  const labelColor =
    props.type == "TYPE_A"
      ? "#15cf0e"
      : props.type == "TYPE_B"
      ? "#138bed"
      : "#fcba03";

  return (
    <div
      key={props.id + Math.random().toString().slice(-4)}
      className="appointment-record">
      <div className="row">
        <h4 className="patient">{patientName}</h4>
        <div className="type" style={{ backgroundColor: labelColor }}>
          {props.type.split("_").join(" ")}
        </div>
      </div>
      <div className="row">
        <div className="signee" hidden={_.isEmpty(props.signee)}>
          <h4>SIGNED BY</h4>
          <div className="flex">
            <div className="profile"></div>
            <div className="name">{signeeName}</div>
          </div>
        </div>
        <div className="supervisor" hidden={_.isEmpty(props.supervisor)}>
          <h4>ATTESTED BY</h4>
          <div className="flex">
            <div className="profile"></div>
            <div className="name">{supervisorName}</div>
          </div>
        </div>
      </div>
      <div className="service-date">
        <h4>SERVICE DATE</h4>
        <div>
          {dayjs(props.serviceStart).format("MMMM DD YYYY")} -{" "}
          {dayjs(props.serviceEnd).format("MMMM DD YYYY")}
        </div>
      </div>
      <div className="card">
        <h3 style={{ borderLeft: `3px solid ${labelColor}` }}>
          {props.type.split("_").join(" ")}
        </h3>
        <div className="service-date">
          {dayjs(props.serviceStart).format("MMMM DD YYYY")} -{" "}
          {dayjs(props.serviceEnd).format("MMMM DD YYYY")}
        </div>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
