import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import React from 'react'
import Dessert from "../components/Dessert";
import Drink from "../components/Drink";
import {Divider} from "antd"

function Home() {
  return (
    <motion.div
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity: 0}}
    transition={{duration: 0.5}}>
        <Popular />
        <Divider/>
        <Veggie />
        <Divider/>
        <Dessert/>
        <Divider/>
        <Drink/>

    </motion.div>
  )
}

export default Home