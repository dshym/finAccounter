import { Chart } from 'react-google-charts';

const TimelineChart = () => {
  return (
      <Chart
          width={'100%'}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={[
              [
                  { type: 'string', id: 'President' },
                  { type: 'date', id: 'Start' },
                  { type: 'date', id: 'End' },
              ],
              ['Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
              ['Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
              ['Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)],
          ]}
          options={{
              showRowNumber: true,
          }}

      />
  );
}

export default TimelineChart;
