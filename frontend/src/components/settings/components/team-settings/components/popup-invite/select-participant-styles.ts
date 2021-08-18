/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  option: (provided: any): any => ({
    ...provided,
    fontSize: '1.25rem',
    padding: '0.2rem',
  }),

  control: (provided: any): any => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
  }),

  valueContainer: (provided: any): any => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
  }),

  input: (provided: any): any => ({
    ...provided,
    margin: '0px',
  }),

  indicatorsContainer: (provided: any): any => ({
    ...provided,
    height: '30px',
  }),

  noOptionsMessage: (provided: any): any => ({
    ...provided,
    height: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
};
