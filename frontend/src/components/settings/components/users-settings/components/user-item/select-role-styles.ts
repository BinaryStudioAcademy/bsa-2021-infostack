/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  menu: (provided: any): any => ({
    ...provided,
    zIndex: 9999,
  }),

  menuPortal: (provided: any): any => ({ ...provided, zIndex: 9999 }),

  option: (provided: any): any => ({
    ...provided,
    fontSize: '1rem',
    padding: '0.2rem',
  }),

  control: (provided: any): any => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '25px',
    height: '25px',
  }),

  valueContainer: (provided: any): any => ({
    ...provided,
    height: '25px',
    padding: '0 6px',
  }),

  input: (provided: any): any => ({
    ...provided,
    margin: '0px',
  }),

  indicatorSeparator: (): any => ({
    display: 'none',
  }),

  indicatorsContainer: (provided: any): any => ({
    ...provided,
    height: '25px',
  }),
};
