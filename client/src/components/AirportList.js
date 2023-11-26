import { Button, Heading, Pane, Table, Select } from "evergreen-ui";
import React from "react";

export function AirportList(props) {

    return (


        <Pane alignItems="right" justifyContent="right" display="flex" paddingTop={50} >
            <Pane width="100%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
            <Button
                    height={50}
                    marginRight={16}
                    appearance="primary"
                    intent="danger"
                    onClick={props.logOut}
                >
                    Log Out
                </Button>
               
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
                
            </Pane>
        </Pane>




    );
}
