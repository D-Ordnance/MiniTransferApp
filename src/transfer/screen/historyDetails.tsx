import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { LoadingModal } from "react-native-loading-modal";
import useHistoryItemDetailController from "../controller/historyItemDetailController";
import { TransferResponse } from "../types/stateTypes";

interface HistoryItemProps {
    route: {params: {transferItem: TransferResponse}};
}
const HistoryDetails = (props: HistoryItemProps) => {
    const {transferItem} = props.route.params
    const {
        
    } = useHistoryItemDetailController
  
    const renderSeparator = () => {
      return (
        <View
          style={{
            height: 2,
            width: "90%",
            marginStart: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#E4E6EB",
          }}
        />
      );
    };
    
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <LoadingModal modalVisible={false}/>
        <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}> Transfer History </Text>
        </View>
        <View style={styles.detail}>
            <Text style={styles.h3}>{"Name: " +transferItem.full_name}</Text>
            <Text style={styles.h3}>{"Amount: " +transferItem.amount}</Text>
            <Text style={styles.h3}>{"Sent to: " + transferItem.account_number}</Text>
            <Text style={styles.h3}>{"Bank Name: " + transferItem.bank_name}</Text>
            <Text style={styles.h3}>{"Narration: " + transferItem.narration}</Text>
            <Text style={styles.h3}>{"Status " + transferItem.status}</Text>
            <Text style={styles.h3}>{"Created to " + transferItem.created_at}</Text>
        </View>
      </SafeAreaView>
    )
}

export default HistoryDetails

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column'
    },
    scrollViewContainer: {
      width: '100%',
    },
    h3: {
        fontSize: 20
    },
    toolbar: {
        flex: .3,
        width: '100%',
        backgroundColor: '#082366',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarTitle: {
        color: "#FFF",
        fontSize: 20,
    },
    detail: {
        flex: .7,
        marginTop: 20,
        paddingHorizontal: 15
    }
});