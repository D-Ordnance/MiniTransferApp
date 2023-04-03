import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, TextInput, SafeAreaView, ActivityIndicator } from "react-native";
import useTransferController from '../controller/transferController';
import DropDownComponent from '../components/dropdown';
import { useCurrencyFormat } from '../../util/util';
import { LoadingModal } from "react-native-loading-modal";
import Toast from 'react-native-root-toast';




const Home = () => {

  const { 
    banks,
    getBankList,
    accountIsValid,
    checkAccountValidity,
    makeTransfer,

    balance,

    onFocus,
    onBlur,
    bankCode,
    isFocus,
    onChange,
    onChangeText,
    accountFieldIsValid,
    accountNumber,
    accountName,
    enableTransferButton,
    onAmountChanged,

    isLoading,

    showMessage,
    message,
    toggleShowMessage,

    viewAllTransferHistory,
  } = useTransferController()

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
      <LoadingModal modalVisible={isLoading}/>
      <Toast 
        visible={showMessage}
        position={Toast.positions.BOTTOM}
        duration={Toast.durations.SHORT}
        shadow={true}
        animation={true}
        hideOnPress={true}
        onHide={toggleShowMessage}>
          {message+" \n Click to dismiss"}
      </Toast>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.mainViewContainer}>
          <View style={styles.headerOneContainer}>
            <Text style={styles.headerOne}>
              Bumpa Mini Transfer Application
            </Text>
            <View style={styles.amountSection}>
              <Text style={styles.balance}>{useCurrencyFormat(balance)}</Text>
            </View>
          </View>
          <View style={styles.transferTextInputCard}>
            <DropDownComponent
              data={banks}
              onChange={onChange}
              value={bankCode}
              isFocus={isFocus}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter Account number'
              maxLength={10}
              keyboardType='numeric'
              onChangeText={onChangeText}
            />
            <View style={styles.blurInputContainer}>
              <TextInput
                style={styles.blurTextInput}
                placeholder='Account name'
                editable={false}
                value={accountName}
                selectTextOnFocus={false}
              />
              {(accountFieldIsValid && !enableTransferButton) && <ActivityIndicator size='small' color='gray' />}
            </View>

            <TextInput
              style={styles.amountTextInput}
              placeholder='Enter Amount'
              maxLength={10}
              keyboardType='numeric'
              onChangeText={onAmountChanged}
            />

          </View>

          <TouchableHighlight
            onPress={makeTransfer}
            disabled={false}
            underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                Make Transfer
              </Text>
            </View>
          </TouchableHighlight>

          {/* Transaction History layout */}
          <View style={styles.transactionContainer}>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
              <Text style={{
                color: '#082366',
                fontSize: 16,
                fontWeight: '400',
                fontStyle: 'normal',
                lineHeight: 24,
              }}>
                Transaction History
              </Text>
              <View style={styles.viewAllSection}>
                <TouchableHighlight onPress={viewAllTransferHistory}>
                  <Text>
                    View All
                  </Text>
                </TouchableHighlight>
                <Image source={require('../../img/ic_baseline_chevron_right.png')}
                  resizeMode='contain'
                  
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  scrollViewContainer: {
    width: '100%',
  },
  mainViewContainer: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  amountSection: {
    flexDirection: 'row',
    width: '100%',
  },
  transferTextInputCard: {
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
    width: '90%',
    borderRadius: 16,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowColor: '#082366',
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 4,
  },
  MainTopStyle: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 8,
    paddingStart: 20,
    backgroundColor: '#082366',
    flexDirection: 'row',
    flex: 0.13,
  },
  headerOneContainer: {
    // marginTop: 40,
    width: '100%',
    height: 250,
    flex: .2,
    backgroundColor: '#082366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOne: {
    color: '#fff',
    fontSize: 20
  },
  textInput: {
    fontWeight: '400',
    backgroundColor: '#fff',
    marginTop: 10,
    width: '92%',
    paddingHorizontal: 20,
    height: 50,
    borderWidth: .5,
    borderRadius: 8,
    borderColor: 'gray',
    fontSize: 16
  },
  amountTextInput: {
    fontWeight: '400',
    backgroundColor: '#fff',
    marginTop: 30,
    width: '92%',
    paddingHorizontal: 20,
    height: 50,
    borderWidth: .5,
    borderRadius: 8,
    borderColor: 'gray',
    fontSize: 16
  },

  blurInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#AEAEAE',
    marginTop: 30,
    width: '92%',
    paddingStart: 20,
    paddingEnd: 10,
    height: 50,
    borderWidth: .5,
    borderRadius: 8,
    borderColor: '#AEAEAE'
  },
  blurTextInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    fontWeight: '400',
    color: '#000'
  },
  button: {
    marginTop: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    backgroundColor: '#373D3C',
    paddingHorizontal: 39,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  transactionContainer: {
    paddingHorizontal: 15,
    width: '100%',
    paddingTop: 15
  },
  balance: {
    fontSize: 30,
    color: '#fff',
    marginTop: 20,
    marginStart: 25
  },

  viewAllSection: {
    flexDirection: 'row',
    right: 12,
    position: 'absolute',
  }
});

export default Home