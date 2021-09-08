import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { IPageStatistic } from 'common/interfaces';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  className?: string;
  axes: string;
  countOfUpdates: IPageStatistic[] | undefined;
}

export const Chart: React.FC<Props> = ({ axes, className, countOfUpdates }) => {
  const counts = countOfUpdates?.map((note) => +(note.count || 0)) as number[];
  const dates = countOfUpdates?.map((note) => note.date) as string[];
  const maxCount = Math.max.apply(null, counts);

  const data = {
    labels: dates.map((date) => days[new Date(date).getDay()]),
    datasets: [
      {
        label: ' # of Updates',
        data: counts,
        backgroundColor: '#4bba73',
        borderWidth: 4,
        borderColor: '#4bba73',
        animation: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: maxCount + 5 - (maxCount % 5),
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
      legend: false,
    },
  };

  return (
    <Card border="light" className={getAllowedClasses(styles.card, className)}>
      <Card.Header className="bg-white border-0 d-flex align-items-center text-secondary">
        {axes}
      </Card.Header>
      <Card.Body className="d-flex justify-content-center">
        <Line
          className={getAllowedClasses(styles.chart)}
          data={data}
          options={options}
          height={75}
        />
      </Card.Body>
    </Card>
  );
};
