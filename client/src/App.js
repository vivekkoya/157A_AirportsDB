import { Button, Heading, Pane, Table, TextInputField, Select} from "evergreen-ui"
import React, { useEffect, useState } from "react"

import { useMongoDB } from "./helpers/mongodb"
import { useRealmApp } from "./helpers/realm"
import { CitySearch } from "./CitySearch"

function LogInForm(props) {
    return (
        <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
            <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
                <Heading size={800} marginTop="10" marginBottom="10">
                    Log in
                </Heading>
                <Pane>
                    <TextInputField
                        label="Username"
                        required
                        placeholder="mongodb@example.com"
                        onChange={(e) => props.setEmail(e.target.value)}
                        value={props.email}
                    />
                </Pane>
                <Pane>
                    <TextInputField
                        label="Password"
                        required
                        placeholder="**********"
                        type="password"
                        onChange={(e) => props.setPassword(e.target.value)}
                        value={props.password}
                    />
                </Pane>
                <Button appearance="primary" onClick={props.handleLogIn}>
                    Log in
                </Button>
            </Pane>
        </Pane>
    )
}



function AirportList(props) {
    const [selectedSurface, setSelectedSurface] = React.useState(null);

    const handleSurfaceChange = (value) => {
      setSelectedSurface(value);
      // You can add additional logic here based on the selected surface
    };
    return (
        

        
        <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
            <Pane width="100%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
            <Heading size={400} marginTop="10" marginBottom="10">
                    Runways By Material Type
                </Heading>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>AirportCode</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Surface
                        <Select paddingLeft="5"
                width={120}
                onChange={(e) => handleSurfaceChange(e.target.value)}
                value={selectedSurface}
              >
                {/* Populate options based on your data */}
                <option value="concrete">Concrete</option>
                <option value="asphalt">Asphalt</option>
                <option value="grass">Grass</option>
                <option value="gravel">Gravel</option>
                <option value="turf">Turf</option>
                {/* Add more options as needed */}
              </Select>
              </Table.TextHeaderCell>
                        <Table.TextHeaderCell>Runway Length</Table.TextHeaderCell>
                      
                    </Table.Head>
                    
                    <Table.Body height={240}>
                        {props.airports.map((airport) => (
                            <Table.Row key={airport._id}>
                                <Table.TextCell>{airport.airport_ident}</Table.TextCell>
                                <Table.TextCell>{airport.surface}</Table.TextCell>
                                <Table.TextCell>{airport.length_ft}</Table.TextCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                
                </Table>
                {props.countrySearch && props.countrySearch.length > 0 && (
                    
                <Table>
                    <Heading size={400} marginTop="10" marginBottom="10">
                   Search Results:
                </Heading>
                    <Table.Head>
                        <Table.TextHeaderCell>Airport Name</Table.TextHeaderCell>
                       
                        <Table.TextHeaderCell>State</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Runway Length(ft)</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Runway Width(ft)</Table.TextHeaderCell>

                        
                      
                    </Table.Head>
                    
                    <Table.Body height={240}>
                        {props.countrySearch.map((country) => (
                            <Table.Row key={country._id}>
                                <Table.TextCell>{country.name}</Table.TextCell>
                                <Table.TextCell>{country.state}</Table.TextCell>
                                <Table.TextCell>{country.result && country.result[0] ? country.result[0].length_ft : 'N/A'}</Table.TextCell>
                                <Table.TextCell>{country.result && country.result[0] ? country.result[0].width_ft : 'N/A'}</Table.TextCell>
                            
                                
                                
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                )}
                <Button
                    height={50}
                    marginRight={16}
                    appearance="primary"
                    intent="danger"
                    onClick={props.logOut}
                >
                    Log Out
                </Button>
            </Pane>
        </Pane>
       
        
        
    )
}

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