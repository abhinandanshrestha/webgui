import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    resetFormData,
    updateFormData,
    resetformDataCSV,
    updateFormDataCSV,
    setFormPrediction,
    setFormCSVPrediction,
    clearFormCSVPrediction,
    setFormCSVPredictionMany,
    clearFormCSVPredictionMany,
    setFormCSVActualMany,
    clearFormCSVActualMany,
} from "../redux/formSlice";

function Form() {
    const {
        formData,
        cols,
        formDataCSV,
        formPrediction,
        formCSVPrediction,
        formCSVPredictionMany,
        formCSVActualMany,
    } = useSelector((state) => state.form);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetFormData());
        dispatch(resetformDataCSV());
        dispatch(setFormPrediction(undefined));
    }, [dispatch]);

    const handleFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateFormData([name, value]));
        dispatch(setFormPrediction(undefined));
    };

    const handleFormDataCSV = (e) => {
        const name = e.target.name;
        const value = name === "allData" ? e.target.checked : e.target.value;
        dispatch(updateFormDataCSV([name, value]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/formpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify(formData), // body data type must match "Content-Type" header
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(setFormPrediction(data.prediction));
            });
    };

    const handleCSVSubmit = (e) => {
        e.preventDefault();
        const csvFormData = new FormData();
        csvFormData.append("file", e.target.file.files[0]);
        csvFormData.append("line_no", formDataCSV.line_no);
        csvFormData.append("csvformat", formDataCSV.csvformat);
        csvFormData.append("allData", formDataCSV.allData);

        fetch("http://localhost:3001/upload_file", {
            method: "POST",
            body: csvFormData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (formDataCSV.allData) {
                    dispatch(clearFormCSVPrediction());
                    dispatch(setFormCSVPredictionMany(data.predictions));
                    if (data.label.length) {
                        dispatch(setFormCSVActualMany(data.label));
                    } else {
                        dispatch(clearFormCSVActualMany());
                    }
                } else {
                    dispatch(clearFormCSVPredictionMany());
                    dispatch(clearFormCSVActualMany());
                    dispatch(setFormCSVPrediction(data.prediction));
                }
            });
    };

    const textBoxes = cols.map((col, index) => (
        <input
            type="text"
            placeholder={col}
            name={col}
            value={formData[col]}
            onChange={handleFormData}
            key={index}
        />
    ));

    return (
        <div className="form">
            <div className="dataForm">
                <div>
                    <h3>Test your data</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>{textBoxes}</div>
                    <div>
                        <button className="form-submit-button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                {formPrediction && (
                    <span>
                        {formPrediction.attack ? (
                            <p>Predicted: Attack</p>
                        ) : (
                            <p>Predicted: Normal</p>
                        )}
                        {formPrediction.attack && (
                            <p>Attack Type: {formPrediction.class}</p>
                        )}
                    </span>
                )}
            </div>
            <hr />
            <div className="csvForm">
                <div>
                    <h3>Test data from CSV</h3>
                </div>
                <form onSubmit={handleCSVSubmit}>
                    <div>
                        Upload your csv:&nbsp;&nbsp;
                        <input
                            type="file"
                            onChange={handleFormDataCSV}
                            value={formDataCSV["file"]}
                            name="file"
                            accept=".csv"
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="allData"
                            value="allData"
                            onChange={handleFormDataCSV}
                        />
                        <label htmlFor="allData">
                            &nbsp;&nbsp;Test All Data
                        </label>
                    </div>
                    {!formDataCSV["allData"] && (
                        <div>
                            Row Number:&nbsp;&nbsp;
                            <input
                                type="number"
                                name="line_no"
                                value={formDataCSV["line_no"]}
                                onChange={handleFormDataCSV}
                            />
                        </div>
                    )}
                    <div>
                        CSV Format:&nbsp;&nbsp;
                        <input
                            type="radio"
                            name="csvformat"
                            value="cicflowmeter"
                            onChange={handleFormDataCSV}
                        />
                        &nbsp;&nbsp;
                        <label htmlFor="cicflowmeter">cicflowmeter</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            type="radio"
                            name="csvformat"
                            value="cicids2017"
                            onChange={handleFormDataCSV}
                        />
                        &nbsp;&nbsp;
                        <label htmlFor="cicids2017">CICIDS2017</label>
                    </div>
                    <div>
                        <button className="form-submit-button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                {formCSVPrediction && (
                    <div>
                        {formCSVPrediction.attack ? (
                            <p>Predicted: Attack</p>
                        ) : (
                            <p>Predicted: Normal</p>
                        )}
                        {formCSVPrediction.attack && (
                            <p>Attack Type: {formCSVPrediction.class}</p>
                        )}
                    </div>
                )}
                {formCSVPredictionMany && (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>S.No.</td>
                                    <td>Predicted Category</td>
                                    <td>Category Label</td>
                                    {formCSVActualMany && <td>Actual </td>}
                                </tr>
                            </thead>
                            <tbody>
                                {formCSVPredictionMany.map(
                                    (prediction, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{prediction[1]}</td>
                                            <td>{prediction[2]}</td>
                                            {formCSVActualMany && (
                                                <td>
                                                    {formCSVActualMany[index]}
                                                </td>
                                            )}
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;
