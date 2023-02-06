import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    resetFormData,
    updateFormData,
    resetformDataCSV,
    updateFormDataCSV,
    setFormPrediction,
    setFormCSVPrediction,
} from "../redux/formSlice";

function Form() {
    const formData = useSelector((state) => state.form.formData);
    const cols = useSelector((state) => state.form.cols);
    const formDataCSV = useSelector((state) => state.form.formDataCSV);
    const formPrediction = useSelector((state) => state.form.formPrediction);
    const formCSVPrediction = useSelector(
        (state) => state.form.formCSVPrediction
    );
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
        const value = e.target.value;
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

        fetch("http://localhost:3001/upload_file", {
            method: "POST",
            body: csvFormData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(setFormCSVPrediction(data.prediction));
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
            <center>
                <h3>Test your data</h3>
            </center>
            <br />
            <form onSubmit={handleSubmit}>
                {textBoxes}
                <br />
                <br />
                <center>
                    <button className="form-submit-button" type="submit">
                        Submit
                    </button>
                </center>
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
            <br />
            <hr />
            <form onSubmit={handleCSVSubmit}>
                <br />
                <center>
                    <h3>Test data from CSV</h3>
                </center>
                Upload your csv:{" "}
                <input
                    type="file"
                    onChange={handleFormDataCSV}
                    value={formDataCSV["file"]}
                    name="file"
                    accept=".csv"
                />
                <br />
                Row Number:{" "}
                <input
                    type="number"
                    name="line_no"
                    value={formDataCSV["line_no"]}
                    onChange={handleFormDataCSV}
                />
                <br />
                CSV Format:
                <input
                    type="radio"
                    name="csvformat"
                    value="cicflowmeter"
                    onChange={handleFormDataCSV}
                />
                <label htmlFor="cicflowmeter">cicflowmeter</label>
                <input
                    type="radio"
                    name="csvformat"
                    value="cicids2017"
                    onChange={handleFormDataCSV}
                />
                <label htmlFor="cicids2017">CICIDS2017</label>
                <center>
                    <button className="form-submit-button" type="submit">
                        Submit
                    </button>
                </center>
            </form>
            <br />
            {formCSVPrediction && (
                <span>
                    {formCSVPrediction.attack ? (
                        <p>Predicted: Attack</p>
                    ) : (
                        <p>Predicted: Normal</p>
                    )}
                    {formCSVPrediction.attack && (
                        <p>Attack Type: {formCSVPrediction.class}</p>
                    )}
                </span>
            )}
        </div>
    );
}

export default Form;
