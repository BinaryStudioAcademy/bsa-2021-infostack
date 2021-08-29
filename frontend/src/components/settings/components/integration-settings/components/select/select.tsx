import Select from 'react-select';

import { IOption } from 'common/interfaces';
import selectRepoStyles from './select-repo-styles';

type Props = {
  handleSelectChange(selectedOption: IOption | null): void;
  options: IOption[] | undefined;
};

export const SelectRepo: React.FC<Props> = ({
  handleSelectChange,
  options,
}) => (
  <Select
    className="mt-4 mb-5"
    onChange={handleSelectChange}
    options={options}
    styles={selectRepoStyles}
    isClearable
    isSearchabl
    autoFocus
  />
);
