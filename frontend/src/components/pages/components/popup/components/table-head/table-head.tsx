import styles from '../styles.module.scss';

interface ITableHeadProps {
  headers: string[];
}

const TableHead: React.FC<ITableHeadProps> = ({ headers }) => {
  return (
    <thead className={styles.tableHead}>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
