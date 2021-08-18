import { getAllowedClasses } from 'helpers/helpers';
import styles from '../styles.module.scss';

type Props = {
  headers: string[];
};

export const TableHead: React.FC<Props> = ({ headers }) => {
  return (
    <thead className={getAllowedClasses(styles.tableHead)}>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};
