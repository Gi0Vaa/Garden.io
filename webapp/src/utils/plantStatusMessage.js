export function humidityMessage(min, max, humidity) {
    if (humidity < min) {
        return {
            state: false,
            message: `The humidity is too low minimum is`, value: `${min}%`
        }
    } 
    else if (humidity > max) {
        return { 
            state: false, 
            message: `The humidity is too high maximum is`, 
            value: `${max}%` 
        }
    }
    else {
        return { 
            state: true, 
            message: 'The humidity is good' 
        }
    }
}

export function temperatureMessage(min, max, temperature) {
    if (temperature < min) {
        return {
            state: false,
            message: `The temperature is too low minimum is`, value: `${min}°C`
        }
    } 
    else if (temperature > max) {
        return { 
            state: false, 
            message: `The temperature is too high maximum is`, 
            value: `${max}°C` 
        }
    }
    else {
        return { 
            state: true, 
            message: 'The temperature is good' 
        }
    }
}