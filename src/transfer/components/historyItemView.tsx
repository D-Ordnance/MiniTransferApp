import { View , StyleSheet, TouchableOpacity, Text} from "react-native"

export interface itemViewProps{
    id?: number,
    name: string,
    amount: number,
    account_number: string
    onItemClick?: () => void
}


const ItemView = (props: itemViewProps) => {

    return(
        <TouchableOpacity onPress={props.onItemClick}>
            <View>
                <Text style={styles.h1}>{"Name: " +props.name}</Text>
                <Text style={styles.h2}>{"Amount: " +props.amount}</Text>
                <Text style={styles.h2}>{"Sent to " + props.account_number}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemView

const styles = StyleSheet.create({
  container: {
    width: '%100',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  h1: {
    fontSize: 20
  },
  h2: {
    fontSize: 15
  }
})