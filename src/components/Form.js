import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    resetFormData,
    updateFormData,
    resetformDataCSV,
    updateFormDataCSV,
} from "../redux/formSlice";

function Form() {
    const formData = useSelector((state) => state.form.formData);
    const cols = useSelector((state) => state.form.cols);
    const formDataCSV = useSelector((state) => state.form.formDataCSV);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetFormData());
        dispatch(resetformDataCSV());
    }, [dispatch]);

    const handleFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateFormData([name, value]));
    };

    const handleFormDataCSV = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateFormDataCSV([name, value]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                console.log(data);
                console.log(data.predictedClass);
            });
        // console.log(JSON.stringify(record))
    };

    const handleCSVSubmit = (e) => {
        e.preventDefault();
        const csvFormData = new FormData();
        console.log(e.target.file.files[0]);
        csvFormData.append("file", e.target.file.files[0]);
        csvFormData.append("line_no", formDataCSV.line_no);

        fetch("http://localhost:3001/upload_file", {
            method: "POST",
            body: csvFormData,
        }).then((res) => {
            console.log("Upload Successful...");
            console.log(res);
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
                <center>
                    <button className="form-submit-button" type="submit">
                        Submit
                    </button>
                </center>
            </form>
            <br />
        </div>
    );
}

export default Form;
