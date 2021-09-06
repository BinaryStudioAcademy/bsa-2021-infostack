import { Bar } from 'react-chartjs-2';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#4bba73',
      borderWidth: 0,
      borderRadius: 100,
      categoryPercentage: 0.15,
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
          size: 25,
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 25,
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

export const Chart: React.FC = () => (
  <>
    <div className="header">
      <h3 className="text-center">Vertical Bar Chart</h3>
    </div>
    <Bar
      className={getAllowedClasses(styles.chart)}
      data={data}
      options={options}
    />
  </>
);
