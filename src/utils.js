export function formatLaravelTimeStamp(laravelTimeStamp)
{
    let date = laravelTimeStamp.split('T')[0]
    let time = laravelTimeStamp.split('T')[1]
    
    time = time.split(':')


    return date + ' ' + time[0] + ':' + time[1]
}