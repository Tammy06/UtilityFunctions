/*
AVAILABLE FUNCTIONS
1) defMonths()          // PARAMETER: none
2) formatNumber(p)      // PARAMETER: integer
3) lastXDays(p)          // PARAMETER: integer
4) formatDate(y, m, d)  // PARAMETERS: integer
5) formatDay(p)         // PARAMETER: integer
6) formatMonth(p)       // PARAMETER: integer
7) getMonthDays(p)      // PARAMETER: integer
8) isLeapYear(p)        // PARAMETER: integer
9) timeAgo(p)           // PARAMETER: date time string E.g '2020-09-07 21:47:43'

WARNINGS
1) functions are not sanitized or validated.
2) watch out for bugs. Test properly before use.
*/

/******************************************/
// format large numbers to user friendly number
// E.g formatNumber(3000) | 3k
function formatNumber(n){
    if(n > 999 && n < 1000000){
        return (n/1000).toFixed(1) + 'K';
    }else if(n > 999999){
        return (n/1000000).toFixed(1) + 'M';
    }else{
        return n;
    }
}

/******************************************/
// time functions.
function defMonths(){
    //define months object
    const months = [
        {'mon': 'January', 'val': 0, 'days': 31},
        {'mon': 'February', 'val': 1, 'days': 28},// account for leap year
        {'mon': 'March', 'val': 2, 'days': 31},
        {'mon': 'April', 'val': 3, 'days': 30},
        {'mon': 'May', 'val': 4, 'days': 31},
        {'mon': 'June', 'val': 5, 'days': 30},
        {'mon': 'July', 'val': 6, 'days': 31},
        {'mon': 'August', 'val': 7, 'days': 31},
        {'mon': 'September', 'val': 8, 'days': 30},
        {'mon': 'October', 'val':9, 'days': 31},
        {'mon': 'November', 'val': 10, 'days': 30},
        {'mon': 'December', 'val': 11, 'days': 31}
    ];
    return months;
}

// returns the date of the last x days from today (up to a month back)
// E.g  lastXDays(7) | 6th july 2020
function lastXDays(x){
    var d = new Date();
    d.setDate(d.getDate() - x);
    return formatDate(d.getFullYear(), d.getMonth(), d.getDate());
}

// returns readable date
// E.g formatDate(2020, 1, 5) | 5th february 2020
function formatDate(y, m, d){
    var day, month;
    day = formatDay(d);
    month = formatMonth(m);
    return day + ' ' + month + ' ' + y;  
}

// returns user friendly date value
// E.g formatDay(3) | 3rd
function formatDay(d){
    if(d == 1 || d == 21 || d == 31){
        return d + 'st';
    }else if(d == 2 || d == 22){
        return d + 'nd';
    }else if(d == 3 || d == 23){
        return d + 'rd';
    }else{
        return d + 'th';
    }
}

// returns readable month string
// the first month is 0, and the last is 11.
// E.g formatMonth(0) | January 
function formatMonth(m){
    //bring months array
    var months = defMonths();
    for(var i = 0; i < months.length; i++){
        if(m == months[i].val){
            return months[i].mon;
        }
    }
}

// returns readable month object
// the first month is 0, and the last is 11.
// E.g getMonthDays(0) | {'mon': 'January', 'val': 0, 'days': 31}
function getMonthDays(m){
    //bring months array
    var months = defMonths();
    for(var i = 0; i < months.length; i++){
        if(m == months[i].val){
            return months[i];
        }
    }
}

// check if a year is leap year.
// returns true or false
// E.g isLeapYear(2020) | true
// E.g isLeapYear(2019) | false
function isLeapYear(year){
    return new Date(year, 1, 29).getDate() == 29;
}

/***********************************************/
// relative time functions
// pass in a date time string. E.g timeAgo('2020-09-07 21:47:43')
// returns time ago. E.g few seconds ago, a days ago, 3 week ago, 4 months ago, 2 years ago.
function timeAgo(itemDate){
    var timeAgo;
    var itemDateArr = itemDate.split(/[^0-9]/);
    var now = new Date();
    //
    var secPerMin = 60;
    var secPerHr = 3600;
    var secPerDy = 86400;
    var secPerWk = 604800;
    var secPerMon = 2592000;
    var secPerYr = 31536000;
    //
    var presYr = now.getFullYear() * secPerYr;
    var presMon = (now.getMonth() + 1) * secPerMon;
    var presDy = now.getDate() * secPerDy;
    var presHr = now.getHours() * secPerHr;
    var presMin = now.getMinutes() * secPerMin;
    var presSec = now.getSeconds();
    //
    var prevYr = parseInt(itemDateArr[0]) * secPerYr;
    var prevMon =  parseInt(itemDateArr[1]) * secPerMon;
    var prevDy = parseInt(itemDateArr[2]) * secPerDy;
    var prevHr = parseInt(itemDateArr[3]) * secPerHr;
    var prevMin = parseInt(itemDateArr[4]) * secPerMin;
    var prevSec = parseInt(itemDateArr[5]);
    //
    var prevTimeSum = prevYr + prevMon + prevDy + prevHr + prevMin + prevSec;
    var presTimeSum = presYr + presMon + presDy + presHr + presMin + presSec;
    var interval = presTimeSum - prevTimeSum;
    //       
    if(interval < secPerMin){
        return 'few seconds ago';
    }
    if(interval > secPerMin && interval < secPerHr){
        timeAgo = Math.round(interval/secPerMin);
        if(timeAgo > 1){
            return timeAgo + ' minutes ago';
        }else{
            return 'a minute ago';
        }   
    }
    if(interval > secPerHr && interval < secPerDy){
        timeAgo = Math.round(interval/secPerHr);
        if(timeAgo > 1){
            return timeAgo + ' hours ago';
        }else{
            return 'an hour ago';
        }
        
    }
    if(interval > secPerDy && interval < secPerWk){
        timeAgo = Math.round(interval/secPerDy);
        if(timeAgo > 1){
            return timeAgo + ' days ago';
        }else{
            return 'a day ago';
        }
    }
    if(interval > secPerWk && interval < secPerMon){
        timeAgo = Math.round(interval/secPerWk);
        if(timeAgo > 1){
            return Math.round(interval/secPerWk) + ' weeks ago';
        }else{
            return 'a week ago';
        }  
    }
    if(interval > secPerMon && interval < secPerYr){
        timeAgo = Math.round(interval/secPerMon);
        if(timeAgo > 1){
            return Math.round(interval/secPerMon) + ' months ago';
        }else{
            return 'a month ago';
        }
    }
    if(interval > secPerYr){
        timeAgo = Math.round(interval/secPerYr);
        if(timeAgo > 1){
            return Math.round(interval/secPerYr) + ' years ago';
        }else{
            return 'a year ago';
        }    
    }
}
