<template>
	<div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
		<!-- <div> -->
		<h4>Energy Statistics</h4>
		<hr>

		<Bar id="my-chart-id" :options="chartOptions" :data="chartData" :plugins="chartPlugins" />
	</div>
</template>
  
<script>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement } from 'chart.js'
import { getNutrientsOfMixes } from '../../../apiConfig'

// Check which ones are really needed
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement);

const plugin = {
	id: 'customCanvasBackgroundColor',
	beforeDraw: (chart) => {
		if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
			var ctx = chart.ctx;
			var chartArea = chart.chartArea;

			ctx.save();
			ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
			ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			ctx.restore();
		}
	}
};

var defaultChartData = ref({
	labels: [],
	datasets: []
});

export default {
	name: 'VemGraph',
	components: { Bar },
	async mounted() {
		const nutrientsOfMixes = await getNutrientsOfMixes();
		const earliestDate = new Date("2024-01-01").toISOString().slice(0, 10);
		const latestDate = new Date().toISOString().slice(0, 10);
      // const earliestDate = new Date(latestDate - 52);
		const allDates = [];
		for (let currentDate = new Date(earliestDate); currentDate <= new Date(latestDate); currentDate.setDate(currentDate.getDate() + 1)) {
			allDates.push(currentDate.toISOString().slice(0, 10));
		}
		var milkProduced = [...Array(allDates.length).fill(22)];
		var startDate = allDates.indexOf("2024-01-01");
      var knownMilkProduced = [
         618.2, 604.8, 637.6, 630.2, 628.8, 565.9, 620.4, 
         593.6, 597.0, 491.8, 437.2, 428.2, 564.4, 590.2, 
         611.5, 594.0, 556.8, 635.9, 593.3, 609.6, 630.3, 
         585.9, 607.1, 573.5, 605.8, 591.1, 631.9, 605.5, 
         651.4, 599.0, 583.1, 648.8, 644.1, 611.5, 656.0, 
         635.4, 610.9, 596.7, 583.5, 649.9, 671.7, 611.9, 
         634.3, 589.6, 644.1, 654.7, 660.1, 601.1, 619.1, 
         569.6, 552.7, 530.6, 520.3, 504.1, 518.3, 477.2, 
         489.0, 459.6, 508.6, 444.0, 466.7, 437.6, 470.6, 
         480.6, 423.6, 415.6, 406.0, 409.1, 446.2, 424.6, 
         386.0, 453.1, 466.5, 475.2, 486.9, 476.8, 424.8,
         442.7, 439.2, 444.6, 420.5, 436.8, 455.3, 464.9];
      var numbersOfCows = [
         29, 28, 28, 28, 28, 28, 28, 
         28, 28, 30, 30, 30, 30, 29, 
         29, 29, 29, 29, 28, 28, 28, 
         28, 28, 28, 27, 27, 27, 27, 
         27, 27, 27, 28, 28, 28, 28, 
         28, 28, 28, 28, 27, 26, 26, 
         26, 26, 26, 26, 26, 26, 26, 
         26, 26, 26, 26, 26, 26, 26, 
         26, 26, 26, 26, 24, 24, 24, 
         24, 23, 23, 23, 23, 23, 24,
         24, 24, 24, 24, 24, 23, 23,
         23, 23, 23, 23, 23, 23, 23];
		// for (let i = numbersOfCows.length; i >= (numbersOfCows.length - 50); i--) {
		// 	milkProduced[latestDate.length - i - 1] = Math.round((knownMilkProduced[knownMilkProduced.length - i] / numbersOfCows[numbersOfCows.length - i]) * 100) / 100;
		// }
      for (let i = 0; i <= allDates.length; i++) {
         milkProduced[startDate + i] = Math.round((knownMilkProduced[i] / numbersOfCows[i]) * 100) / 100;
      }
		var vemNeeded = [...Array(allDates.length).fill(0)];
		for (let i = 0; i < vemNeeded.length; i++) {
			vemNeeded[i] = (milkProduced[i] * 419.25) + 7344;
		}
		var vemProvided = Array(allDates.length).fill(null);
		for (let i = 0; i < nutrientsOfMixes.length; i++) {
			var index = allDates.indexOf(new Date(nutrientsOfMixes[i].dateTime).toISOString().slice(0, 10));
			vemProvided[index] = nutrientsOfMixes[i].vemTotal;
		}
		defaultChartData.value = {
			// labels: allDates,
         labels: allDates.slice(allDates.length - 56, allDates.length),
			datasets: [
				{
					label: "Average milk production",
					data: milkProduced.slice(milkProduced.length - 57, milkProduced.length),
					yAxisID: "A",
					borderColor: '#bdbdbd',
					backgroundColor: '#ffffff',
					order: 3,
					borderRadius: { topLeft: 5, topRight: 5 },
					borderWidth: 3,
				},
				{
					type: 'line',
					label: "Average VEM needed",
					data: vemNeeded.slice(vemNeeded.length - 56, vemNeeded.length),
					yAxisID: "B",
					borderColor: "#00ff00",
					backgroundColor: "#00bd00",
					order: 2,
					spanGaps: true
				},
				{
					type: 'line',
					label: "Average VEM provided",
					data: vemProvided.slice(vemProvided.length - 56, vemProvided.length),
					yAxisID: "B",
					borderColor: "#0000ff",
					backgroundColor: "#0000bd",
					order: 1,
					spanGaps: true
				}
			]
		};
	},
	data() {
		return {
			// loaded: false,
			chartData: defaultChartData,
			chartOptions: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Milk - VEM'
					},
					legend: {
						position: 'bottom',
					}
				},
				scales: {
					A: {
						type: 'linear',
						position: 'left',
					},
					B: {
						type: 'linear',
						position: 'right',
					},
					x: {
						grid: {
							display: false
						}
					}
				},
				chartArea: {
					backgroundColor: '#F0F5E4'
				}
			},
			chartPlugins: [plugin]
		}
	},
}
</script>
