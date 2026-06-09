import AsyncStorage from "@react-native-async-storage/async-storage"

const API_BASE_URL = "http://localhost:3000/api";

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
}

export async function getAllEvents() {
    try { 
        // to remove in the final version of the application
        await delay(1000); 
        const response = await fetch(`${API_BASE_URL}/events`);
        if(!response.ok) {
            return {
                success: false,
                events: [],
                error: `server error ${response.status}`,
                offline: false
            }
        }

        const events = await response.json(); 
        console.log("getAllEvents");

        await AsyncStorage.setItem("eventCache", JSON.stringify(events));

        return {
            success: true,
            events,
            offline: false
        }
        
    } catch (error) {
        console.log("api error" , error.message);

        const cacheEvents = await AsyncStorage.getItem("eventCache");
        if (cacheEvents) {
            return {
                success: true,
                events: JSON.parse(cacheEvents),
                offline: true,
            }
        } 
        return{
            success: false,
            events: [],
            error: "Unable to load event",
            offline: true
        }   
    }
    
}

export async function getEventById(id) {
    try { 
        const response = await fetch(`${API_BASE_URL}/events/${id}`);
        if(!response.ok) {
            return {
                success: false,
                event: [],
                error: `Server error ${response.status}`,
                
            }
        }
        const event = await response.json(); 
        return {
            success: true,
            event,
        }
        
    } catch (error) {
        console.log("api error" , error.message)
        return{
            success: false,
            event: null,
            error: error.message
        }        
    }
}

export async function registerForEvent(eventId, fullName, email) {
    try { 
        const response = await fetch(`${API_BASE_URL}/registrations`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({eventId, fullName, email})
            }
        );
        const data = await response.json(); 

        if(!response.ok) {
            return {
                success: false,
                error: data.error || `Registration failed`,
                
            }
        }
       
        return {
            success: true,
            registrationId: data.registrationId,
            message: data.message 
        }
        
    } catch (error) {
        console.log("api error" , error.message);
        return {
            success: false,
            error: error.message || "Network error"
        };     
    }
}