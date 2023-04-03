import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import useTransferViewModel from "../view_model/transferViewModel";
import { useNavigation } from "@react-navigation/native";
import { TransferResponse } from "../types/stateTypes";

const useHistoryController = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch<AppDispatch>()
    const {
        transferResponse
    } = useTransferViewModel();

    
    const transformToUIHistoryController: {name: string, amount: number, account_number: string}[] = transferResponse.map((obj) => {
        return {"id": obj["id"],
                "name": obj["full_name"],
                "amount": obj["amount"],
                "account_number": obj["account_number"]}
    })

    const viewTransferItemDetail = (id: number) => {

        const item: TransferResponse = transferResponse.find((obj) => transferResponse["id"] == id)
        
        navigation.navigate("History Details", {item})
    }
    

    return {
        viewTransferItemDetail,
        transformToUIHistoryController
    }
}

export default useHistoryController