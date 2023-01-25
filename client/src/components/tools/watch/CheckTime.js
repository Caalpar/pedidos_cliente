
export const CheckIsOpen = (day,hour,minutes,hours_days) =>{


    return  CheckHoursAndDay(day,hour,minutes,hours_days.days_noon,hours_days.hours.noon.open,hours_days.hours.noon.close,'noon') ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_morning,hours_days.hours.morning.open,hours_days.hours.morning.close,'morning') ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_late,hours_days.hours.late.open,hours_days.hours.late.close,'late') ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_nigth,hours_days.hours.nigth.open,hours_days.hours.nigth.close,'nigth') 
    }

    export const CheckHoursAndDay = (current_day,currentHours,currentMinutes,openDays,openHours,closeHours,text ='') => {
        
        // console.log(text)
        // console.log(CheckIsOpenDay(current_day,openDays))
        // console.log(CheckIsOpenHoursAndMinutes(currentHours,currentMinutes,openHours,closeHours))
        // console.log('-----------------------------------')
    return CheckIsOpenDay(current_day,openDays) && CheckIsOpenHoursAndMinutes(currentHours,currentMinutes,openHours,closeHours,text)
    }


   export const CheckIsOpenHoursAndMinutes = (currentHours,currentMinutes,openHours,closeHours,text) =>
    {
    let _openHours = parseInt(openHours.replace(':',''))

    let _closeHours = parseInt(closeHours.replace(':',''))

    let minutes = parseInt(currentMinutes.toString()) < 10 ? '0' + currentMinutes.toString() : currentMinutes.toString()

    let _currentHours = parseInt(currentHours.toString() + minutes)

    // console.log({_openHours,_closeHours,_currentHours,text})
    // console.log('-----------------------------------')

    if(_currentHours >= _openHours && _currentHours < _closeHours)
        return true
    else
        return false

    }

    export const CheckIsOpenDay = (current_day,days) =>{

    if(current_day == 0 && days.sunday)
        return true
    if(current_day == 1 && days.monday)
        return true
    if(current_day == 2 && days.tuesday)
        return true
    if(current_day == 3 && days.wedesday)
        return true
    if(current_day == 4 && days.thursday)
        return true
    if(current_day == 5 && days.friday)
        return true
    if(current_day == 6 && days.saturday)
        return true


    return false
    }

    export const CkeckIsOpenText= (hours_days) =>
    {
        return {
            noon: CheckIsOpenHoursAndDaysText(hours_days.days_noon,hours_days.hours.noon.open,hours_days.hours.noon.close,hours_days.time_zone),
            morning: CheckIsOpenHoursAndDaysText(hours_days.days_morning,hours_days.hours.morning.open,hours_days.hours.morning.close,hours_days.time_zone), 
            late: CheckIsOpenHoursAndDaysText(hours_days.days_late,hours_days.hours.late.open,hours_days.hours.late.close,hours_days.time_zone),
            nigth: CheckIsOpenHoursAndDaysText(hours_days.days_nigth,hours_days.hours.nigth.open,hours_days.hours.nigth.close,hours_days.time_zone) 
        }

    }

    export const CheckIsOpenHoursAndDaysText = (days,openHours,closeHours,timeZone) =>{
        let {open,close}  = CheckIsOpenHoursText(openHours,closeHours,timeZone)
        let  daysText = CheckIsOpenDayText(days)
        return {open,close,daysText}
    }

    export const CheckIsOpenHoursText = (openHours,closeHours,timeZone) =>{

    
      let _openHoursArry = openHours.split(':')

      let _closeHoursArray = closeHours.split(':')
     
      let _openHours = parseInt(_openHoursArry[0])

      let _closeHours = parseInt(_closeHoursArray[0])

      let nowDate = new Date()

      let time_zone =  timeZone - parseInt(nowDate.getTimezoneOffset()/60)

      let open = `${_openHours - time_zone > 9 ? _openHours - time_zone : '0'+ (_openHours - time_zone).toString()}:${_openHoursArry[1]}`
      
      let close = `${_closeHours - time_zone > 9 ? _closeHours - time_zone : '0'+ (_closeHours - time_zone).toString()}:${ _closeHoursArray[1]}`
      


      return {open,close }

    }
    
    export const CheckIsOpenDayText = (days) =>{

        let count = 0
        let result = ''

        if(days.sunday){
            count++
        }
        if(days.monday){
            count++
        }
        if(days.tuesday){
            count++    
        }
        if(days.wedesday){
            count++
        }
        if(days.thursday){
            count++
        }
        if(days.friday){
            count++
        }
        if(days.saturday){
            count++
        }

        if(count == 0){
            result = 'cerrado'
        }
        else if(count == 7){
            result = 'Lunes - Domingo'
        }
        else
        {
            let arrDays = Object.entries(days)

            for (let index = 0; index < arrDays.length -2; index++) {
                const day = arrDays[index][1];
                const next_day_1 = arrDays[index+1][1];
                const next_day_2 = arrDays[index+2][1];

                if(day && index == 0)
                {
                    result = 'Lunes'
                }

                if((next_day_1 && !next_day_2) || (!day && next_day_1))
                {
                    switch (index + 1) {

                        case 1:
                            result = AddSeparateAndText(result, 'Martes',day)     
                            break;
                        case 2:
                            result = AddSeparateAndText(result, 'Miercoles',day)
                            break;
                        case 3:
                            result = AddSeparateAndText(result, 'Jueves',day)
                            break;
                        case 4:
                            result = AddSeparateAndText(result, 'Viernes',day)
                            break;
                        case 5:
                            result = AddSeparateAndText(result, 'Sabado',day)
                            break;
        
                    }
                }
                if ((index + 2 == arrDays.length - 1) && next_day_2)
                result = AddSeparateAndText(result, 'Domingo',next_day_1)
            }
        }    
    return result
}

        
const AddSeparateAndText = (text, new_text ,last_day)=> {
    if (text != '')
        {
            if(!last_day)
            text += ' / ' + new_text
            else
            text += ' - ' + new_text
        }
    else
        text += new_text
    return text
}