import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ data=[], title }) => {

    return(
  <div style={{ textAlign: 'center' }} className='pie_chart'>
    <p>{title}</p>
    {/* ResponsiveContainer makes the chart scale nicely */}
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%" // Center x-coordinate
          cy="50%" // Center y-coordinate
          innerRadius={80} // Creates the donut hole
          outerRadius={120} // Outer size of the donut
          paddingAngle={5} // Small space between slices
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

    <div className='pie_chart_'>
        {
            data?.map((item, i)=>(
                <div key={i} className='pie_chart_details' >
                    <div style={{backgroundColor: item?.color}} ></div>
                    <p>{item.value}% {item?.name}</p>
                </div>
            ))
        }
    </div>
  </div>
)};

export default CustomPieChart