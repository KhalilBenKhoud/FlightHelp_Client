import { useCallback, useEffect, useState } from "react"
import {  StyleSheet, Text, View } from "react-native"
import { Searchbar } from "react-native-paper"
import useFetch from "../../hooks/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import TicketsList from "./TicketsList";
import AllTickets from "./AllTickets";


const UserTickets = () => {
  return (
    <AllTickets ofCurrentUser={true} />
  )
}


const styles = StyleSheet.create({
    container : {
        padding : 25,
        gap : 20,
        flex : 1
    }
})
export default UserTickets