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
<iframe
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-itpum/embed/charts?id=6562cdce-35ac-4a23-8759-3e4e604b7b46&maxDataAge=36&theme=light&autoRefresh=true"
      ></iframe>
        
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
