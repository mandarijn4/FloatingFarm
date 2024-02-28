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

// var defaultChartData = { labels: [], datasets: [] };

export default {
	name: 'VemGraph',
	components: { Bar },
	data() {
		return {
			loaded: false,
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
	async mounted() {
		this.loaded = false;

		try {
			const nutrientsOfMixes = await getNutrientsOfMixes();
			const earliestDate = new Date(nutrientsOfMixes[0].dateTime).toISOString().slice(0, 10);
			const latestDate = new Date().toISOString().slice(0, 10);
			const allDates = [];
			for (let currentDate = new Date(earliestDate); currentDate <= new Date(latestDate); currentDate.setDate(currentDate.getDate() + 1)) {
				allDates.push(currentDate.toISOString().slice(0, 10));
			}
			var milkProduced = [...Array(allDates.length).fill(22)];
			var startDate = allDates.indexOf("2024-01-11");
			var knownMilkProduced = [
				21.40, 19.89, 19.70, 19.67, 19.49, 19.21, 19.96, 20.21, 21.36, 21.66,
				21.73, 21.53, 21.87, 21.87, 21.90, 22.07, 23.40, 22.43, 24.13, 22.19,
				21.60, 23.17, 23.00, 21.84, 23.43, 22.69, 21.82, 21.31, 20.84, 24.07,
				25.83, 23.53, 24.40, 22.68, 24.77, 25.18, 25.39, 23.12, 23.81, 21.91,
				21.26, 20.41, 20.02, 19.39, 19.93, 18.35, 18.81, 17.68];
			for (let i = 0; i < knownMilkProduced.length; i++) {
				milkProduced[startDate + i] = knownMilkProduced[i];
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
				labels: allDates,
				datasets: [
					{
						label: "Average milk production",
						data: milkProduced,
						yAxisID: "A",
						borderColor: '#bdbdbd',
						backgroundColor: '#ffffff',
						order: 3,
						borderRadius: { topLeft: 5, topRight: 5 },
						borderWidth: 1,
					},
					{
						type: 'line',
						label: "Average VEM needed",
						data: vemNeeded,
						yAxisID: "B",
						borderColor: "#00ff00",
						backgroundColor: "#00bd00",
						order: 2,
						spanGaps: true
					},
					{
						type: 'line',
						label: "Average VEM provided",
						data: vemProvided,
						yAxisID: "B",
						borderColor: "#0000ff",
						backgroundColor: "#0000bd",
						order: 1,
						spanGaps: true
					}
				]
			};
			this.loaded = true;
		} catch (error) {
			console.error(error);
		}
		// Retrieve nutrients of mixes
		// getNutrientsOfMixes().then((nutrientsOfMixes) => {
		// 	// Find the earliest and latest dates
		// 	const earliestDate = new Date(nutrientsOfMixes[0].dateTime).toISOString().slice(0, 10);
		// 	const latestDate = new Date().toISOString().slice(0, 10);

		// 	// Generate an array of all dates between the earliest and latest dates
		// 	const allDates = [];
		// 	for (let currentDate = new Date(earliestDate); currentDate <= new Date(latestDate); currentDate.setDate(currentDate.getDate() + 1)) {
		// 		allDates.push(currentDate.toISOString().slice(0, 10));
		// 	}

		// 	// Generate guestimated filler data for milk produced with a bit of manually added real data
		// 	var milkProduced = [...Array(allDates.length).fill(22)];
		// 	var startDate = allDates.indexOf("2024-01-11");
		// 	var knownMilkProduced = [
		// 		21.40, 19.89, 19.70, 19.67, 19.49, 19.21, 19.96, 20.21, 21.36, 21.66, 
		// 		21.73, 21.53, 21.87, 21.87, 21.90, 22.07, 23.40, 22.43, 24.13, 22.19, 
		// 		21.60, 23.17, 23.00, 21.84, 23.43, 22.69, 21.82, 21.31, 20.84, 24.07, 
		// 		25.83, 23.53, 24.40, 22.68, 24.77, 25.18, 25.39, 23.12, 23.81, 21.91, 
		// 		21.26, 20.41];
		// 	for (let i = 0; i < knownMilkProduced.length; i++) {
		// 		milkProduced[startDate+i] = knownMilkProduced[i];
		// 	}

		// 	// Retrieve static theoretical data of two values
		// 	var vemNeeded = [...Array(allDates.length).fill(0)];
		// 	for (let i = 0; i < vemNeeded.length; i++) {
		// 		vemNeeded[i] = (milkProduced[i] * 419.25) + 7344;
		// 	}

		// 	// Generate an array with at the correct indices the available vem values
		// 	var vemProvided = Array(allDates.length).fill(null);
		// 	for (let i = 0; i < nutrientsOfMixes.length; i++) {
		// 		var index = allDates.indexOf(new Date(nutrientsOfMixes[i].dateTime).toISOString().slice(0, 10));
		// 		vemProvided[index] = nutrientsOfMixes[i].vemTotal;
		// 	}

		// 	defaultChartData.value = {
		// 		labels: allDates,
		// 		datasets: [
		// 			{
		// 				label: "Average milk production",
		// 				data: milkProduced,
		// 				yAxisID: "A",
		// 				borderColor: '#bdbdbd',
		// 				backgroundColor: '#ffffff',
		// 				order: 3,
		// 				borderRadius: {topLeft: 5, topRight: 5},
		// 				borderWidth: 1,
		// 			},
		// 			{
		// 				type: 'line',
		// 				label: "Average VEM needed",
		// 				data: vemNeeded,
		// 				yAxisID: "B",
		// 				borderColor: "#00ff00",
		// 				backgroundColor: "#00bd00",
		// 				order: 2,
		// 				spanGaps: true
		// 			},
		// 			{
		// 				type: 'line',
		// 				label: "Average VEM provided",
		// 				data: vemProvided,
		// 				yAxisID: "B",
		// 				borderColor: "#0000ff",
		// 				backgroundColor: "#0000bd",
		// 				order: 1,
		// 				spanGaps: true
		// 			}
		// 		]
		// 	};
		// });
	},
}
</script>
