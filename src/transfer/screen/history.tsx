import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, View, Text, TouchableHighlight} from "react-native";
import { LoadingModal } from "react-native-loading-modal";
import useHistoryController from '../controller/historyController';
import ItemView from "../components/historyItemView";
import {itemViewProps} from "../components/historyItemView"

const History = () => {

    const{
        viewTransferItemDetail,
        transformToUIHistoryController
    } = useHistoryController()
  
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

    const renderHistoryList = ({item}: {item: itemViewProps}) => {
        return (
            <ItemView name={item.name} 
                    amount={item.amount}
                    account_number={item.account_number}
                    onItemClick={() => {viewTransferItemDetail(item.id)}}
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
        {(transformToUIHistoryController.length == 0) 
        && 
        <View style={styles.empty}>
            <Text>No Transfer History</Text>
        </View>}
        {(transformToUIHistoryController.length != 0)
        &&
        <FlatList
            style={styles.list}
            data={transformToUIHistoryController}
            renderItem={renderHistoryList}
            ItemSeparatorComponent={renderSeparator}
        />
        } 
      </SafeAreaView>
    )
}

export default History

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column'
    },
    scrollViewContainer: {
      width: '100%',
    },
    list: {
        flex: .7,
        marginTop: 20,
        paddingHorizontal: 15
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
    empty: {
        flex: .7,
        alignItems: 'center',
        justifyContent: 'center'
    }
});