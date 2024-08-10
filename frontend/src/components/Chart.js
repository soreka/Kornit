import { Typography } from '@mui/material';
import '../assets/styles/Chart.css'
function Chart({ data }) {
    return (
        <div className="chart">
            {data.map((value, index) => {
                const percentage = ((value.value - value.minValue) / (value.maxValue - value.minValue)) * 100;
                const roundedToNine = Math.round(percentage / 9);
                return (
                    <div className="line" key={index}>
                        <span className='lineTitle'>{value.Title}</span>
                        {Array.from({ length: 9 }, (_, i) => (
                            <div
                                key={i}
                                className={`data ${i + 1 > roundedToNine ? 'notFilled' : ''}`}
                            >
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    )
}

export default Chart;