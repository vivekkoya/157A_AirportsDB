import { Button, Heading, Pane, Table, TextInputField } from "evergreen-ui"
import React, { useEffect, useState } from "react"

import { useMongoDB } from "./helpers/mongodb"
import { useRealmApp } from "./helpers/realm"

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
    return (
        <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
            <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>AirportID</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Surface</Table.TextHeaderCell>
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

    useEffect(() => {
        async function wrapQuery() {
            if (user && db) {
                const allAirports = await db.collection("157b").find({"surface": {"$regex": "^t", "$options": "i"}})
                console.log("Airports by surface turf", allAirports); 
                setAiprots(allAirports)
                
            }
            
            
        }
        wrapQuery()
    }, [user, db])

    async function handleLogIn() {
        await logIn(email, password)
    }

    return user && db && user.state === "active" ? (
        <AirportList airports={airports} user={user} logOut={logOut} />
        

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