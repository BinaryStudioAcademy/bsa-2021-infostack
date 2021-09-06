import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sat'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3, 15],
      backgroundColor: '#4bba73',
      borderWidth: 4,
      borderColor: '#4bba73',
    },
  ],
};

const options = {
  scales: {
    y: {
      min: 0,
      max: 20,
      ticks: {
        stepSize: 5,
        font: {
          size: 16,
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 16,
        },
      },
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface Props {
  className?: string;
  axes: string;
}

export const Chart: React.FC<Props> = ({ axes, className }) => (
  <Card border="light" className={getAllowedClasses(styles.card, className)}>
    <Card.Header className="bg-white border-0 d-flex align-items-center text-secondary">
      {axes}
    </Card.Header>
    <Card.Body className="d-flex justify-content-center">
      <Line
        className={getAllowedClasses(styles.chart)}
        data={data}
        options={options}
      />
    </Card.Body>
  </Card>
);
