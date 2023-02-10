import { createSlice } from "@reduxjs/toolkit";

const cols = [
    "Destination_Port",
    "Flow_Duration",
    "Total_Fwd_Packets",
    "Total_Backward_Packets",
    "Total_Length_of_Fwd_Packets",
    "Total_Length_of_Bwd_Packets",
    "Fwd_Packet_Length_Max",
    "Fwd_Packet_Length_Min",
    "Fwd_Packet_Length_Mean",
    "Fwd_Packet_Length_Std",
    "Bwd_Packet_Length_Max",
    "Bwd_Packet_Length_Min",
    "Bwd_Packet_Length_Mean",
    "Bwd_Packet_Length_Std",
    "Flow_Bytes/s",
    "Flow_Packets/s",
    "Flow_IAT_Mean",
    "Flow_IAT_Std",
    "Flow_IAT_Max",
    "Flow_IAT_Min",
    "Fwd_IAT_Total",
    "Fwd_IAT_Mean",
    "Fwd_IAT_Std",
    "Fwd_IAT_Max",
    "Fwd_IAT_Min",
    "Bwd_IAT_Total",
    "Bwd_IAT_Mean",
    "Bwd_IAT_Std",
    "Bwd_IAT_Max",
    "Bwd_IAT_Min",
    "Fwd_PSH_Flags",
    "Bwd_PSH_Flags",
    "Fwd_URG_Flags",
    "Bwd_URG_Flags",
    "Fwd_Header_Length",
    "Bwd_Header_Length",
    "Fwd_Packets/s",
    "Bwd_Packets/s",
    "Min_Packet_Length",
    "Max_Packet_Length",
    "Packet_Length_Mean",
    "Packet_Length_Std",
    "Packet_Length_Variance",
    "FIN_Flag_Count",
    "SYN_Flag_Count",
    "RST_Flag_Count",
    "PSH_Flag_Count",
    "ACK_Flag_Count",
    "URG_Flag_Count",
    "CWE_Flag_Count",
    "ECE_Flag_Count",
    "Down/Up_Ratio",
    "Average_Packet_Size",
    "Avg_Fwd_Segment_Size",
    "Avg_Bwd_Segment_Size",
    "Fwd_Avg_Bytes/Bulk",
    "Fwd_Avg_Packets/Bulk",
    "Fwd_Avg_Bulk_Rate",
    "Bwd_Avg_Bytes/Bulk",
    "Bwd_Avg_Packets/Bulk",
    "Bwd_Avg_Bulk_Rate",
    "Subflow_Fwd_Packets",
    "Subflow_Fwd_Bytes",
    "Subflow_Bwd_Packets",
    "Subflow_Bwd_Bytes",
    "Init_Win_bytes_forward",
    "Init_Win_bytes_backward",
    "act_data_pkt_fwd",
    "min_seg_size_forward",
    "Active_Mean",
    "Active_Std",
    "Active_Max",
    "Active_Min",
    "Idle_Mean",
    "Idle_Std",
    "Idle_Max",
    "Idle_Min",
    // "Label",
];
let fd = {};
cols.forEach((col) => {
    fd[col] = "";
});

const initialState = {
    formData: fd,
    cols: cols,
    formDataCSV: { file: "", line_no: "", csvformat: "", allData: false },
    formPrediction: undefined,
    formCSVPrediction: undefined,
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        resetFormData: (state) => {
            state.formData = fd;
        },
        updateFormData: (state, x) => {
            state.formData = {
                ...state.formData,
                [x.payload[0]]: x.payload[1],
            };
        },
        resetformDataCSV: (state) => {
            state.formDataCSV = { file: "", line_no: "" };
        },
        updateFormDataCSV: (state, x) => {
            state.formDataCSV = {
                ...state.formDataCSV,
                [x.payload[0]]: x.payload[1],
            };
        },
        setFormPrediction: (state, prediction) => {
            state.formPrediction = prediction.payload;
        },
        setFormCSVPrediction: (state, prediction) => {
            state.formCSVPrediction = prediction.payload;
        },
    },
});

export const {
    resetFormData,
    updateFormData,
    resetformDataCSV,
    updateFormDataCSV,
    setFormPrediction,
    setFormCSVPrediction,
} = formSlice.actions;

export default formSlice.reducer;
