import React from 'react'
import { Chart } from 'react-charts'
 
function MyChart() {
  const data = React.useMemo(
    () => [
      {
        label: 'data 2',
        data: []
      },
      {
        label: 'data 1',
        data: []
      },
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '100%',
        height: '330px',
        
      }}
    >
      <Chart data={data} axes={axes} tooltip />
    </div>
  )
  return lineChart
}
export default MyChart;
