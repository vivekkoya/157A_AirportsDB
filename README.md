# Airports Visualizer
![image](https://github.com/vivekkoya/157A_AirportsDB/assets/67130044/3697a856-ed49-4a9a-9437-37bcb332e726)
![image](https://github.com/vivekkoya/157A_AirportsDB/assets/67130044/9a2f3c87-a76a-47b7-8b9f-ed0dd3d5db40)


# Website URL:
To access the app visit this link: [https://157a-airportsdb.pages.dev/](https://157a-airportsdb.pages.dev/)
<br>
_Login Credentials_
<br>
**email:** admin
**password:** password


# Database Application README

This repository contains the source code for our database application, a project that leverages MongoDB, React, and Atlas Realm to manage and display detailed information about airports and runways worldwide.

## Search by Country
```jsx
exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "airlinedb";
  var collName = "Airports";


  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  
  
const pipeline = [
  {
    $match: {
      country: arg,
    },
  },
  {
    $lookup: {
      from: "Runways",
      localField: "icao",
      foreignField: "airport_ident",
      as: "result",
    },
  },
  {
    $project: {
      name: 1,
      city: 1,
      state: 1,
      "result.length_ft": 1,
      "result.width_ft": 1,
    },
  },
  {
    $limit: 100
  }
];



var result;
  try {
    

    result = collection.aggregate(pipeline).toArray();

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return {result};
};
```
## Insertion Example
```javascript
exports = async function(){
  var serviceName = "mongodb-atlas";
  var dbName = "testdbairline";
  var collName = "Airports";
  var coll2Name = "Runways";

  var collection1 = context.services.get(serviceName).db(dbName).collection(collName);
  var collection2 = context.services.get(serviceName).db(dbName).collection(coll2Name);

  var insertDataAirports;
  var insertedDocumentAirports;
  var insertDataRunways;
  var insertedDocumentRunways;

  try {
    const coll1Data = {
      icao: "00GA",
      name: "Lt World Airport",
      city: "Lithonia",
      state: "Georgia",
      country: "US",
      elevation: 700,
      lat: 33.7675018311,
      lon: -84.0682983398,
      tz: "America/New_York"
    };

    // Insert into collection1
    insertDataAirports = await collection1.insertOne(coll1Data);

    // Find the inserted document by _id
    insertedDocumentAirports = await collection1.findOne({ _id: insertDataAirports.insertedId });

    // Basic assertion for unit testing
    if (!insertedDocumentAirports || insertedDocumentAirports.icao !== coll1Data.icao) {
      throw new Error('Airport insertion test failed.');
    }

    const coll2Data = {
      _id: "65585baf68d99366528ab09f",
      id: "265040",
      airport_ref: "6540",
      airport_ident: "00IN",
      length_ft: "40",
      width_ft: "40",
      surface: "MATS",
      lighted: "1",
      closed: "0",
      le_ident: "H1",
      le_latitude_deg: "",
      le_longitude_deg: "",
      le_elevation_ft: "",
      le_heading_degT: "",
      le_displaced_threshold_ft: "",
      he_ident: "",
      he_latitude_deg: "",
      he_longitude_deg: "",
      he_elevation_ft: "",
      he_heading_degT: "",
      he_displaced_threshold_ft: ""
    };

    // Insert into collection2 (runways)
    insertDataRunways = await collection2.insertOne(coll2Data);

    // Find the inserted document by _id
    insertedDocumentRunways = await collection2.findOne({ _id: insertDataRunways.insertedId });

    // Basic assertion for unit testing
    if (!insertedDocumentRunways || insertedDocumentRunways.airport_ident !== coll2Data.airport_ident) {
      throw new Error('Runways insertion test failed.');
    }

  } catch(err) {
    console.log("Error occurred during the test:", err.message);
    return { error: err.message };
  }

  return { result: { airportData: insertedDocumentAirports, runwaysData: insertedDocumentRunways } };
};

```
## Credits
Data Sources:
<b>
(https://github.com/davidmegginson/ourairports-data)
<b>
(https://github.com/mwgg/Airports)

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/vivekkoya/157A_AirportsDB.git
```

### Navigate to the Project Directory

```bash
cd 157A_AirportsDB
```

### Navigate to the Client Directory

```bash
cd client
```

### Install Dependencies

Ensure that Node.js is installed on your machine, then run the following command to install the necessary dependencies:

```bash
npm install
```
or
```bash
npm i
```

### Run the Application

Once the dependencies are installed, start the application with the following command:

```bash
npm start
```

This will launch the development server and open the application in your default web browser. If the browser doesn't open automatically, navigate to [http://localhost:8080](http://localhost:8080) in your browser.

