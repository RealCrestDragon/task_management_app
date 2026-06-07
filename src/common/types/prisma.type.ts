export interface DriverAdapterError {
  cause: {
    constraint: { fields: string[] };
  };
}
