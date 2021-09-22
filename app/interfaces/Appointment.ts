export default interface Appointment {
  id: string;
  type: string;
  status: string;
  description: string;
  serviceStart: string;
  serviceEnd: string;
  patient: {
    id: string;
    account: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  signee: {
    id: string;
    account: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  supervisor: {
    id: string;
    account: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}
