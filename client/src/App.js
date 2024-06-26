/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react"

import { useMongoDB } from "./helpers/mongodb"
import { useRealmApp } from "./helpers/realm"
import { CitySearch } from "./components/CountrySearch"
import { LogInForm } from "./components/LogInForm"
import { AirportList } from "./components/AirportList"
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";






function App() {
    const { logIn, logOut, user } = useRealmApp()
    const { db } = useMongoDB()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [countrySearch, setCountrySearch] = useState([])
    
    const [selectedCountryCode, setSelectedCountryCode] = useState(null); // New state to store the selected country code


    useEffect(() => {
        async function wrapQuery() {
            if (user && db) {
                
                // Use the selected country code in the country_search function
                const search = await user.functions.country_search(selectedCountryCode);
                console.log("Airports by country", search.result);
                setCountrySearch(search.result);

                // Add the chart integration code here
                const sdk = new ChartsEmbedSDK({
                    baseUrl: "https://charts.mongodb.com/charts-project-0-itpum",
                });

                const chart = sdk.createChart({
                    chartId: "6563b735-e05a-4f9b-8085-769a58b92a66",
                    height: "800px",
                    filter: {country: selectedCountryCode},
                    theme: "dark"
                    
                });
                const chart1 = sdk.createChart({
                    chartId: "65630fd4-9ab1-4689-8249-82c8468b68f1",
                    height: "800px",
                    filter: {country: selectedCountryCode},
                    theme: "dark"   
                });
                await chart.render(document.getElementById("chart"));
                await chart1.render(document.getElementById("chart1"))
               
               
                

                


                
                 
              
                
            }
            
            
        }
        wrapQuery()
    }, [user, db, selectedCountryCode]);

    async function handleLogIn() {
        await logIn(email, password)
    }

    return user && db && user.state === "active" ? (
        <>
    
        <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
        <CitySearch setCountryCode={setSelectedCountryCode} countrySearch={countrySearch}/>
        <br></br>
        <div style={{display: 'flex'}}>
        <iframe style={{background: '#21313C',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        marginRight: '100px',
                        marginLeft: '100px'
        }} 
        width="640" 
        height="480"
         src="https://charts.mongodb.com/charts-project-0-itpum/embed/charts?id=656317ff-f4f9-4bb5-8848-c74168af8ad3&maxDataAge=300&theme=dark&autoRefresh=true"></iframe>


    <iframe
        style={{
            background: '#21313C',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-itpum/embed/charts?id=65631eec-e05a-4583-834a-769a588371d7&maxDataAge=3600&theme=dark&autoRefresh=true"
    />
</div>

       
   
        <AirportList countrySearch={countrySearch} user={user} logOut={logOut} />
        <br></br>
        
        <div id="chart"></div>
        <div id="chart1"></div>
        </div>
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
