import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import useTransferViewModel from "../view_model/transferViewModel";


const useHistoryItemDetailController = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {
        transferResponse
    } = useTransferViewModel();
    

    return {
        
    }
}

export default useHistoryItemDetailController