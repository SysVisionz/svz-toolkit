export const callbacker = (elements, callback, length = 1, index = 0) => {
	elements = [...elements]
	while(elements.length > 0){
		const value = elements.splice(0, length);
		callback(value, index)
		index++;
	}
}

Object.filter = (object, test) => {
	for (const i in object){
		if (!test(object[i])){
			delete object[i];
		}
	}
}

Number.isPositive = (number) => {
	if (number > 0){
		return 1;
	}
	if (number < 0){
		return -1
	} 
	return 0;
}

Number.confine = (number, max, min) => {
	if(max !== null && number > max){
		return max;
	}
	if (min !== undefined && min !== null && number < min){
		return min;
	}
	return number;
}

export const filterJoin = (arr, joinVal = ' ') => {
	for (const i in arr){
		if(arr[i] && typeof arr[i] === 'object'){
			arr[i] = arr[i][1] ? arr[i][0] : null;
		}
	}
	return arr.filter(a => a).join(joinVal)
}


export const alterClass = (elem, className, remove) => {
	if(elem.classList.contains(className) && remove){
		elem.classList.remove(className);
	}
	else if (!elem.classList.contains(className) && !remove){
		elem.classList.add(className)
	}
}

Array.sameVal = (num, val) => new Array(num).fill(val)

Array.standardized = (array, index) => {
	for (let i = 1; i < array.length; i++){
		if (index){
			if (array[i][index] !== array[i-1][index]){
				return false;
			}
		}
		else if (array[i] !== array[i-1]){
			return false;
		}
	}
	return index 
		? array[0][index] === undefined ? null : array[0][index] 
		: array[0] === undefined ? null : array[0]
}

Number.calcAdditive = (number, maxVal) => {
	let i = 0;
	let calcTotal = 0;
	while (Math.abs(calcTotal) < Math.abs(number)) {
		i++;
		const addTo = maxVal && i > maxVal ? maxVal*Number.isPositive(number) : Number.isPositive(number)*i;
		calcTotal += addTo;
	}
	return i;
}

Object.sameVal = (keyArray, val) => {
	const retval = {};
	for (const i in keyArray){
		retval[keyArray[i]] = val;
	}
	return retval;
}

Array.sequential = (length, calculate, current = []) => {
	current.push(calculate(current.length-1));
	if (current.length === length){
		return current;
    }
	else {
		return Array.sequential(length, calculate, current)
    }
}

Array.sum = (arr) => arr.reduce((a, b) => a + b, 0);

Object.sequential = (arrKeys, calculate, current = {}) => {
	const i = Object.keys(current).length
	current[arrKeys[i]] = calculate(arrKeys[i])
	if (arrKeys.length === i){
		return current;
	}
	else {
		return Object.sequential(arrKeys, calculate, current)
	}
}

export class NumberMan {
	constructor(number, exact){
		this.number = number;
		this.exact = exact;
	} 

	//toPhone converts a number or string to a US phone number format.
	toPhone = (number = this.number) => "(" + (''+number).substr(0,3) + ") " + (''+number).substr(3,3) + "-" + (''+number).substr(6)

	//toDollars returns either the NumberMan's number or an inputted number to currency format
	toDollars = (number = this.number) => "$" + (number ? this.addZeroes(2, true, this.capDigits(number, 2)) : '0.00');

	//addZeroes adds zeroes as a prefix or as decimal places until the test evaluates as false.
	addZeroes = (digits, toEnd = true, number) => {
		const {trailingDigits, maxDigits, addZeroes, addZero} = this;
		//prevent exceeding maximum defined digits.
		const addMore = (toEnd ? trailingDigits(''+number || this.number) <= digits : (''+(number || this.number)).length <= digits) && !(toEnd && (trailingDigits(''+(number || this.number)) === maxDigits))
		//if the test function evaluates to true, add a decimal place if toEnd is true and we haven't reached the maximum decimal places specified, and add a prefix 0 if toEnd is false.
		if (addMore){
			if (number) {
				return addZeroes(digits, toEnd, addZero(toEnd, number));
			}
			else {
				this.number = addZeroes(digits, toEnd, addZero(toEnd, this.number))
			}
		} else {
			return number;
		}
	}

	set places (digits) {
		this.maxDigits = typeof digits === 'string' ? this.trailingDigits(digits) : digits;
		this.number = this.number;
	}

	sizeOf = (numberVal, trailing = true) => trailing ? (''+numberVal).includes('.') ? (''+numberVal).substring((''+numberVal).indexOf('.')+1).length : 0 : 0;

	addZero = (toEnd, number) => (!toEnd ? '0' : '') + number + (toEnd ? (''+number).includes('.') ? '0' : '.0' : '')

	capDigits = (number, digits = this.maxDigits) => Math.round(Number.parseFloat(number)*Math.pow(10,digits))/Math.pow(10,digits);

	exactPlaces = digits => {
		this.maxDigits = digits;
		if (this.trailingDigits() > digits){
			this.number = this.capDigits(this.number);
		}
		this.numberVal = this.addZeroes(digits)
	}

	set number (numberValue) {
		//ensure that the number's value does not exceed the maximum trailing digits set for this NumberMan.
		if (!numberValue){
			return false;
		}
		if (this.maxDigits && this.trailingDigits(numberValue) > this.maxDigits) {
			this.numberVal = ''+numberValue;
			this.exactPlaces(this.maxDigits)
		} else {
			this.numberVal = ''+numberValue;
			if (this.exact){
				this.exactPlaces(this.maxDigits)
			}
		}
	}

	get number(){
		return this.numberVal
	}


	// trailingDigits returns the number of decimal places
	trailingDigits = number => {
		if (number){
			return this.sizeOf(number);
		}
		return this.sizeOf(this.number);
	}

	// toDigits accepts a string to test against, an array of values to test against or a number of digits
	// and either adds zeroes as prefixes or zeroes as decimal places.
	toDigits = (digitsOrNumberArray, trailing = true) => {
		const {addZeroes, trailingDigits} = this;
		const newLength = (current, test) => {
			const digits = trailing ? trailingDigits(test) : test.length;
			return Math.max(digits, current);
		}
		let toLength = trailing ? trailingDigits() : this.number.length;
		if (typeof digitsOrNumberArray === 'object'){
			for (const i in digitsOrNumberArray){
				toLength = newLength(toLength, ''+digitsOrNumberArray[i])
			}
		}
		else if(typeof digitsOrNumberArray === 'string'){
			toLength =  newLength(toLength, digitsOrNumberArray);
		}
		else if(typeof digitsOrNumberArray === 'number'){
			toLength = Math.max(toLength, digitsOrNumberArray);
		}
		addZeroes(toLength, trailing);
		return this.number;
	}
}

export class Gradienter {
	constructor (colorsArr){
		this.colorMap = {};
		for (let i = 0; i < 16; i++){
			if (i < 10){
				this.colorMap[i] = Number.parseInt(i);
			}
			else {
				this.colorMap[String.fromCharCode(55+i)] = Number.parseInt(i);
			}
		}
		this.colors = colorsArr;
		this.mapColors = [];
		for (const i in this.colorMap){
			this.mapColors.push(i);
		}
	}
	
	colorFromArr = colorArr => {
		const {mapColors} = this;
		for ( const i in colorArr ) {
			colorArr[i] = colorArr === 0 ? '00' :'' + mapColors[Math.floor(colorArr[i]/16)] + mapColors[colorArr[i] % 16];
		}
		return '#' + colorArr.join('');
	}

	colorToArr = color => {
		color = color.toUpperCase();
		color = color.substr(1);
		const colors = Array(4);
		const {colorMap} = this;
		for (const i in color.split('')){
			const ch = color.charAt(i);
			if (color.length < 6){
				if (colors[i] === undefined){
					colors[i] = 0;
				}
				colors[i] += colorMap[ch] * 16 + colorMap[ch];
			}
			else{
				if (colors[Math.floor(i/2)] === undefined){
					colors[Math.floor(i/2)] = 0;
				}
				colors[Math.floor(i/2)] += i % 2 === 0 ? colorMap[ch] * 16 : colorMap[ch];
			}
		}
		if (colors[3] === undefined){
			colors[3] = 255;
		}
		return colors;
	}

	calcArc = (number1, number2, stages, invert) => {
		const placeHold = invert ? number1 : null;
		number1 = invert ? number2 : number1;
		number2 = invert ? placeHold : number2;
		const stageLocs = [number1];
		for (let i = 1; i < stages; i++){
			stageLocs[i] = number2 - Math.round((Math.cos(Math.PI*i/(stages*2)+(invert ? .5*Math.PI : 0))+(invert ? 1 : 0))/.5*(number2/2-number1/2)) ;
		}
		stageLocs.push(number2);
		if (invert){
			stageLocs.reverse();
		}
		return stageLocs
	}

	set colors (colorsArr) {
		const retval = [];
		for ( const i in colorsArr){
			retval[i] = (this.colorToArr(colorsArr[i]));
		}
		this.colorsArr = retval;
	}

	get colors () {
		const retval = this.colorsArr;
		for (const i in retval){
			retval[i] = this.colorFromArr([retval[i][0], retval[i][1], retval[i][2], retval[i][3]] )
		}
		return retval;
	}

	addColor = color => this.colorsArr.push(this.colorToArr(color))

	arcGradient = (complexity, type="linear-gradient", direction, invert) => {
		const colors = this.colorsArr;
		const newColors = [];
		const perStage = complexity/(colors.length-1);
		const retval = [];
		for (let i = 1; i < colors.length; i++){
			const arr = [];
			const first = colors[i-1];
			const second = colors[i];
			for (const index in first){
				arr.push(this.calcArc(first[index], second[index], perStage));
			}
			for (const index in arr[0]){
				newColors.push([arr[0][index], arr[1][index], arr[2][index], arr[3][index]]);
			}
		}
		for (const i in newColors){
			retval.push(this.colorFromArr([newColors[i][0], newColors[i][1], newColors[i][2], newColors[i][3]]));
		}
		return type + '( ' + (direction ? direction +', ' : '') + retval.join(', ') + ')'
	}
}

export class CookieMan {

	static set (name, value, expiration) {
		if (name && value){
			let cookieString = name + '=' + value + ';';
			if (expiration){
				const date=new Date(expiration);
				cookieString += ' expires=' + date.toLocalString + ';';
			}
			cookieString += ' path=/;';
			document.cookie = cookieString;
		}
		else {
			return 'Requires name and value as (name, value)';
	    }
	}

    static get (name) {
		const cookieStrings = (decodeURIComponent(document.cookie).split(';'));
		name = name+'=';
		for ( let i in cookieStrings) {
			i = Number.parseInt(i);
			let curr = cookieStrings[i].trim();
			if (curr.indexOf(name) === 0){
				curr = curr.substring(name.length);
				return curr;
			}
		}
		return decodeURIComponent(document.cookie).split(';');
    }

    static delete(name, path) {
    	document.cookie= path ? name+'==; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=' + path + ';' : name+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

}

export class TimeMan {
	constructor(ms){
		this.time = ms;
	}

	trim = time => {
		while ((time.charAt(0) === '0' || time.charAt(0) === ':') && time.length > 1){
			time = time.substring(1);
		}
		return time;
	}

	set time(entry){
		if (entry === undefined){
			this.date = new Date();
		}
		else{
			this.type = typeof entry === 'number' ? 'ms' : 'date';
			this.date = new Date(entry);
		}
	}


	get fromToday(){
		let today = new Date()
		return today + this.date;
	}

	set millisecond(milliseconds){ this.type === 'ms' ? this.date.setTime(milliseconds) : this.date.setMilliseconds(milliseconds) }

	set second(seconds){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 1000 + 1000*seconds) : this.date.setSeconds(seconds) }

	set hour(hours){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 3600000 + 3600000*hours) : this.date.setHours(hours) }

	set minute(minutes){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 60000 + 60000*minutes) : this.date.setMinutes(minutes) }

	get milliseconds(){ return this.type === 'ms' ? this.date.getTime() : this.date.getMilliseconds() }

	get millisecond(){return this.milliseconds }

	get second(){ return this.type === 'ms' ? this.milliseconds/1000 : this.date.getSeconds()}

	get seconds(){ return this.second}
	
	get minutes(){ return this.type === 'ms' ? Math.floor(this.milliseconds/60000) : this.date.getSeconds()}

	get minute(){ return this.type === 'ms' ? this.minutes + this.date.toTimeString().substr(5,3) : this.date.getSeconds()}

	get hours(){ return this.type === 'ms' ? Math.floor(this.milliseconds/3600000) : this.date.getHours()}

	get hour (){ return this.type === 'ms' ? this.hours + this.date.toTimeString().substr(2,6) : this.date.getHours()}

	get day () { return this.type === 'ms' ? Math.floor(this.milliseconds/86400000) : this.date.getDate() }

	get weekday () { return this.type === 'ms' ? new Date(this.date - 320400000).getDay() : this.date.getDay()}

	millisecondsFrom = (inputDate, absolute = true) => absolute ? Math.abs(this.date - new Date(inputDate)) : this.date - new Date(inputDate);

	secondsFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/1000)

	minutesFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/60000)
	
	hoursFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/3600000)

	daysFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/86400000)
	
	yearsFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/31536000000)
	
	centuriesFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/3153600000000)

	milleniaFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/31536000000000)
}