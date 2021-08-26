import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

interface ITableHeadProps {
  headers: string[];
}

export const TableHead: React.FC<ITableHeadProps> = ({ headers }) => {
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
