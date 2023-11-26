import React, { useEffect, useState } from "react"

import { useMongoDB } from "./helpers/mongodb"
import { useRealmApp } from "./helpers/realm"
import { CitySearch } from "./components/CountrySearch"
import { LogInForm } from "./components/LogInForm"
import { AirportList } from "./components/AirportList"



function App() {
    const { logIn, logOut, user } = useRealmApp()
    const { db } = useMongoDB()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [airports, setAiprots] = useState([])
    const [countrySearch, setCountrySearch] = useState([])
    
    const [selectedCountryCode, setSelectedCountryCode] = useState(null); // New state to store the selected country code

    useEffect(() => {
        async function wrapQuery() {
            if (user && db) {
                const allAirports = await db.collection("157b").find({"surface": {"$regex": "^g", "$options": "i"}})
                console.log("Airports by surface turf", allAirports); 
                setAiprots(allAirports)

                // Use the selected country code in the country_search function
                const search = await user.functions.country_search(selectedCountryCode);
                console.log("Airports by country", search.result);
                setCountrySearch(search.result);
                 
              
                
            }
            
            
        }
        wrapQuery()
    }, [user, db, selectedCountryCode]);

    async function handleLogIn() {
        await logIn(email, password)
    }

    return user && db && user.state === "active" ? (
        <>
        <CitySearch setCountryCode={setSelectedCountryCode} countrySearch={countrySearch}/>
        <AirportList countrySearch={countrySearch} airports={airports} user={user} logOut={logOut} />
        
        
        </>
        

    ) : (
        <LogInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogIn={handleLogIn}
        />
    )
}

export default App