import * as RealmWeb from "realm-web"
import Realm from "realm"

import React, { useContext, useState } from "react"

const RealmAppContext = React.createContext(null)

const RealmApp = async ({ children }) => {
    // const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID
    const app = new RealmWeb.App({ id:"application-1-xpzpg"})
    const [user, setUser] = useState(null)

    // const logIn = async (email, password) => {
    //     const credentials = RealmWeb.Credentials.emailPassword(email, password)
    //     try {
    //         await app.logIn(credentials)
    //         setUser(app.currentUser)
    //         return app.currentUser
    //     } catch (e) {
    //         setUser(null)
    //         return null
    //     }
    // }
    const credentials = Realm.Credentials.anonymous();
try {
  const user = await app.logIn(credentials);
} catch(err) {
  console.error("Failed to log in", err);
}

    const logOut = () => {
        if (user !== null) {
            app.currentUser.logOut()
            setUser(null)
        }
    }

    return (
        <RealmAppContext.Provider
            value={RealmAppContext}
        >
            {children}
        </RealmAppContext.Provider>
    )
}

export const useRealmApp = () => {
    const realmContext = useContext(RealmAppContext)
    // if (realmContext == null) {
    //     throw new Error("useRealmApp() called outside of a RealmApp?")
    // }
    return realmContext
}

export default RealmApp
