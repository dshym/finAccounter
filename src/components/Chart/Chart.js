import { Pie } from '@ant-design/charts';

const Chart = (props) => {
    const config = {
        appendPadding: 0,
        data: props.data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    };
    return  <Pie {...config} />;
};

export default Chart;
