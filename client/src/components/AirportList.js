import { Button, Heading, Pane, Table, Select } from "evergreen-ui";
import React from "react";

export function AirportList(props) {
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




    );
}
