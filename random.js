/* Tyler D. 8/15/13 */

window.onload = init;

function init() {
	document.getElementById("randButton").onclick = start;
	document.getElementById("clearButton").onclick = resetTextArea;
	//document.getElementById("dump").onclick = dumpData;
	document.getElementById("presetPop").onclick = setTextPopData;
	document.getElementById("presetUFO").onclick = setTextUfoData;
}

function resetTextArea() {
	document.getElementById("randomNums").value = "";
	document.getElementById("stats").style.opacity = "0";
	document.getElementById("csvData").style.opacity = "0";
}

function start() {
	var inputNums;
	var randNums;
	var count;
	var numLength;
	var digitCountArray;

	count = parseInt(document.getElementById("numChoose").value);
	if(isNaN(count)) {
		alert("You must enter a value for the number of numbers to choose");
		return;
	}

	//read the numbers from the textarea
	inputNums = readNumbers();

	numLength = inputNums.length; //number of numbers the user input

	//get the random numbers
	randNums = chooseRandom(inputNums, count);

	setStatus("Chose " + count + " numbers out of a total of " + inputNums.length);
	
	//count the digits
	digitCountArray = countFirstDigit(randNums);

	//hide the divs
	document.getElementById("stats").style.opacity = "0";
	document.getElementById("csvData").style.opacity = "0";
	console.log(digitCountArray.length);
	showChosenNums(randNums, true);
	createStats(digitCountArray, count);
	dumpCSV(digitCountArray);
}

function setStatus(msg) {
	var statusBar = document.getElementById("status");
	statusBar.innerHTML = "<p>" + msg + "</p>";
}

function readNumbers() {
	//read the numbers in the textarea and split
	//them into an array

	var textArea = document.getElementById("randomNums");
	var nums;

	if(textArea.value == "") {
		alert("You must enter a list of numbers.");
		return;
	}

	//split the textarea up into the array
	nums = textArea.value.split("\n");

	return nums;
}

//select count random numbers from the array
//nums. The function returns an array of 
//numbers.
//There is a possibility that the same number
//could be chosen twice, but as long as the 
//data set is big enough it shouldn't matter.
function chooseRandom(nums, count) {
	var randNums = [];
	var maxNum = nums.length - 1;
	var rand = 0;

	for(var i = 0; i < count; i++) {
		rand = Math.floor(Math.random() * maxNum);
		randNums.push(nums[rand]); //add number to array		
	}

	return randNums;
}

function countFirstDigit(numArray) {
	var count = numArray.length;
	var tempString;
	var digitArray = [0,0,0,0,0,0,0,0,0,0];
	var digit;

	for(var i = 0; i < count; i++) {
		tempString = numArray[i].toString();

		if(tempString != "") { //possible empty strings
			digit = tempString[0]; //first digit
			digit = parseInt(digit); //turn it back into an int

			digitArray[digit]++; //increment the count
		}
	}
	return digitArray;
}

function showChosenNums(numArray, sort) {
	var textArea = document.getElementById("randomNums");
	var count = numArray.length;

	if(sort)
		numArray.sort();

	textArea.value = "";

	for(var i = 0; i < count; i++) {
		textArea.value += numArray[i].toString() + "\n";
	}
}

function dumpCSV(digitArray) {
	var csvList = document.getElementById("csvList");
	var listStr = "";

	for(var i = 1; i < 9; i++) //skip 0
	{
		listStr += "<li>" + i + "," + digitArray[i] + "</li>";
	}

	csvList.innerHTML = listStr;

	document.getElementById("csvData").style.opacity = "1";
}
//totalRandNums is the number of random numbers selected
//it is needed to calculate the percentages.
function createStats(digitCountArray, totalRandNums)
{
	var table = document.getElementById("statsTable");
	var row = "";
	var percentage = 0;
	var currentCount = 0;
	var count = totalRandNums;
	var id;

	table.innerHTML = ""; //clear out the table

	row = "<tr id='trh'><th>Digit</th><th>Count</th><th>Percent</th></tr>";
	table.innerHTML += row;

	

	//skip index 0 since we don't have numbers that start with 0
	for(var i = 1; i < 10; i++) {
		currentCount = digitCountArray[i]
		percentage = (currentCount / count) * 100;
		id = "tr" + i;
		console.log("" + currentCount + "/" + count + " = " + percentage);
		row = "<tr id='"+id+"'><td>" + i + "</td><td>" + currentCount + "</td><td>"+percentage.toFixed(2)+"%</td></tr>";
		table.innerHTML += row;
		
	}

	document.getElementById("stats").style.opacity = "1";
}

//functions to prepopulate the textArea
function setTextPopData() {
	var textArea = document.getElementById("randomNums");
	var nums = [1349585838, 1220800359, 316668567, 251160124, 201009622, 193238868, 174507539, 163654860, 142500482, 127253075, 116220947, 105720644, 93877025, 92477857, 85294388, 81147265, 80694485, 79853900, 75507308, 67448120, 65951611, 63395574, 61482297, 55167330, 48955203, 48601098, 48261942, 47370542, 45745783, 44573205, 44037656, 42610981, 38383809, 38087812, 34847910, 34758809, 34568211, 32649130, 31858481, 31108077, 30430267, 29849303, 29628392, 28661637, 28459085, 26939583, 25408288, 25199609, 24720407, 24096669, 23299716, 22599098, 22457336, 22400835, 22262501, 21790479, 21675648, 20549221, 18565269, 17812961, 17736896, 17216945, 16899327, 16805037, 16777547, 15968882, 15439429, 15205539, 14373472, 14222233, 13300410, 13182908, 12012589, 11193452, 11176026, 11090104, 11061886, 10888321, 10835873, 10799270, 10772967, 10461053, 10444268, 10251568, 10219630, 10162921, 9939470, 9893934, 9877292, 9625888, 9590159, 9119423, 8448465, 8221646, 7996026, 7910041, 7707042, 7243007, 7182724, 7154237, 6981642, 6695166, 6623252, 6482081, 6431902, 6233682, 6108590, 6002347, 5788531, 5612685, 5556452, 5548042, 5488339, 5473972, 5460302, 5266114, 5166510, 5113040, 4775982, 4722701, 4695942, 4555911, 4492689, 4475611, 4365113, 4131583, 3989703, 3875723, 3674209, 3619925, 3559408, 3515858, 3437610, 3324460, 3226516, 3154134, 3011405, 2974184, 2909714, 2695316, 2676740, 2182852, 2178443, 2127825, 2087171, 2042444, 1992690, 1936181, 1883051, 1847708, 1763387, 1660870, 1640286, 1403362, 1322238, 1281332, 1266375, 1225225, 1172390, 1155403, 896758, 792198, 752288, 739903, 725296, 704001, 653474, 597248, 583003, 566846, 538811, 531046, 514862, 415717, 411277, 393988, 334297, 319031, 315281, 288725, 277293, 264022, 261565, 195476, 186817, 162781, 160378, 146836, 109590, 109153, 106322, 106104, 104737, 103248, 103220, 95732, 90846, 90156, 86159, 85293, 73286, 69747, 69467, 65605, 57714, 54719, 53737, 51170, 51134, 49709, 47754, 39689, 37009, 32448, 31912, 31264, 30500, 29111, 21108, 15754, 15700, 15700, 15507, 10698, 10447, 9434, 7754, 7298, 5774, 5189, 3140, 2196, 1921, 1513, 1353, 1229, 839, 596, 48];

	textArea.value = "";

	for(var i = 0; i < nums.length; i++) {
		textArea.value += nums[i] + "\n";
	}
}

function setTextUfoData() {
	var textArea = document.getElementById("randomNums");
	var nums = [639, 592, 505, 392, 372, 267, 362, 649, 762, 661, 742, 877, 917, 735, 508, 493, 526, 385, 574, 528, 438, 632, 546, 633, 743, 392, 315, 315, 327, 270, 325, 302, 357, 463, 448, 523, 832, 371, 327, 292, 259, 186, 291, 291, 320, 315, 595, 499, 608, 384, 359, 316, 341, 394, 498, 349, 453, 530, 379, 504, 570, 470, 344, 443, 339, 370, 474, 360, 373, 445, 448, 468, 463, 418, 312, 321, 361, 265, 441, 387, 413, 398, 321, 427, 422, 334, 300, 322, 305, 231, 251, 276, 464, 486, 530, 350, 449, 403, 299, 313, 356, 278, 257, 305, 330, 450, 411, 546, 438, 427, 389, 390, 412, 300, 304, 381, 471, 472, 507, 543, 448, 306, 249, 225, 191, 267, 327, 248, 295, 334, 373, 488, 431, 345, 250, 190, 195, 258, 237, 213, 278, 256, 345, 395, 405, 307, 255, 233, 291, 230, 282, 232, 231, 327, 296, 296, 361, 271, 185, 197, 225, 201, 230, 225, 447, 310, 399, 316, 301, 283, 190, 165, 161, 174, 144, 192, 212, 226, 244, 173, 184, 207, 104, 129, 146, 86, 81, 73, 123, 112, 57, 126, 220, 191, 107, 94, 191, 47, 53, 84, 85, 54, 72, 79, 78, 147, 79, 103, 65, 74, 59, 56, 118, 107, 128, 191, 132, 177, 103, 89, 123, 119, 95, 39, 23, 59, 35, 61, 56, 77, 32, 30, 23, 11, 16, 16, 20, 22, 23, 43, 43, 93, 27, 15, 18, 14, 16, 14, 15, 35, 20, 29, 33, 66, 19, 23, 10, 14, 5, 12, 16, 17, 29, 31, 33, 48, 24, 15, 13, 9, 11, 16, 21, 27, 20, 36, 48, 49, 18, 9, 9, 19, 18, 21, 25, 37, 23, 23, 32, 54, 23, 9, 11, 8, 14, 9, 16, 38, 17, 45, 35, 51, 11, 9, 14, 5, 12, 11, 15, 23, 12, 34, 40, 46, 18, 17, 10, 3, 12, 9, 11, 26, 17, 26, 25, 50, 13, 16, 9, 10, 7, 10, 11, 19, 19, 23, 36, 73, 15, 10, 6, 4, 10, 6, 12, 20, 17, 25, 25, 53, 12, 8, 10, 5, 8, 6, 6, 9, 15, 21, 26, 42, 16, 21, 6, 3, 3, 9, 9, 18, 20, 22, 34, 63, 15, 4, 1, 5, 6, 5, 12, 12, 20, 24, 23, 55, 12, 10, 5, 4, 11, 17, 6, 24, 24, 27, 38, 70, 20, 7, 14, 7, 15, 9, 19, 16, 27, 31, 39, 67, 16, 18, 14, 10, 10, 14, 20, 24, 22, 56, 80, 79, 13, 14, 12, 13, 20, 10, 14, 14, 19, 33, 63, 73, 25, 11, 13, 6, 11, 7, 16, 19, 29, 29, 61, 100, 14, 8, 4, 10, 11, 15, 20, 29, 22, 40, 53, 105, 12, 16, 12, 5, 16, 8, 20, 27, 25, 40, 47, 76, 16, 15, 6, 4, 11, 5, 13, 37, 23, 27, 42, 57, 13, 9, 8, 6, 7, 7, 8, 18, 16, 20, 30, 68, 11, 2, 9, 2, 5, 2, 6, 10, 15, 14, 23, 31, 9, 9, 2, 8, 6, 8, 6, 14, 12, 18, 25, 47, 12, 4, 6, 6, 11, 7, 8, 16, 7, 25, 37, 46, 9, 5, 5, 2, 8, 7, 7, 22, 14, 25, 40, 76, 16, 11, 2, 2, 14, 3, 9, 20, 23, 37, 18, 61, 10, 18, 7, 6, 5, 7, 12, 17, 20, 20, 25, 70, 14, 12, 15, 3, 4, 15, 9, 20, 10, 30, 35, 55, 10, 8, 2, 4, 3, 4, 4, 13, 18, 16, 30, 8, 4, 4, 2, 3, 5, 1, 9, 19, 35, 5, 5, 3, 2, 3, 1, 5, 3, 8, 12, 15, 22, 5, 2, 6, 1, 1, 2, 2, 6, 3, 8, 8, 13, 3, 2, 1, 2, 2, 3, 2, 6, 14, 14, 28, 3, 1, 1, 3, 1, 1, 2, 6, 3, 8, 11, 19, 4, 3, 1, 2, 3, 5, 5, 7, 24, 4, 3, 1, 2, 2, 3, 9, 8, 13, 16, 23, 3, 1, 4, 1, 1, 2, 4, 4, 1, 7, 23, 3, 3, 2, 5, 1, 5, 6, 19, 2, 2, 2, 2, 3, 3, 7, 12, 22, 2, 1, 1, 4, 4, 2, 1, 6, 6, 9, 2, 6, 1, 2, 2, 4, 2, 5, 17, 21, 2, 2, 2, 1, 1, 1, 1, 2, 6, 7, 1, 1, 1, 2, 1, 1, 2, 2, 6, 15, 1, 2, 1, 2, 3, 2, 4, 2, 3, 2, 1, 1, 2, 1, 5, 1, 1, 1, 2, 5, 20, 9, 2, 1, 3, 1, 2, 1, 4, 1, 1, 1, 1, 2, 2, 6, 1, 1, 1, 1, 1, 2, 4, 2, 3, 1, 1, 2, 3, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	textArea.value = "";

	for(var i = 0; i < nums.length; i++) {
		textArea.value += nums[i] + "\n";
	}
}
function dumpData() {
	var textArea = document.getElementById("randomNums");
	var nums = textArea.value.split("\n");
	var str = '"';


	for(var i = 0; i < nums.length; i++) {
		str += nums[i] + ", ";
	}

	str[str.length - 1] = '"';

	textArea.value = str;
}