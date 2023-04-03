import  { bankType }  from "../types/bankType"
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';



interface DropdownProps {
    data: bankType[],
    onChange: (item: any) => void,
    value: any,
    isFocus: boolean,
    onFocus: () => void,
    onBlur: () => void,
}
const DropDownComponent = (props: DropdownProps) => {
  const data: {label: string, value: string}[] = props.data.map((obj) => {
    if(obj["name"] !== undefined && obj["code"] !== undefined){
      return {label: obj["name"], value: obj["code"]}
    }
  })

    const renderLabel = () => {
      if (props.value || props.isFocus) {
        return (
          <Text style={[styles.label, props.isFocus && { color: 'blue' }]}>
            Banks
          </Text>
        );
      }
      return null;
    };



  return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, props.isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!props.isFocus ? 'Select Bank' : '...'}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange = {item => props.onChange(item)}
          renderLeftIcon={() => (
            <MaterialCommunityIcons 
              name="bank-outline" 
              style={styles.icon}
              size={20} 
              color={props.isFocus ? 'blue' : 'black'}
            />
          )}
        />
      </View>
    );
};


    
    export default DropDownComponent

    const styles = StyleSheet.create({
      container: {
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    });