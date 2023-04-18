import React from "react"
import Sphere from "./components/Sphere"
import {FillLight, KeyLight, RimLight} from './Lighting/lightBasic';
import Points from './components/Points'



const Content = ()=> {
    return (
        <>
            <KeyLight brightness={9} color="#abf" />
            <FillLight brightness={8} color="#fff" />
            <RimLight brightness={54} color="#fff" />
            <Sphere color={0xffffff5} />
            <Points />

        </>
    )
}

export default Content