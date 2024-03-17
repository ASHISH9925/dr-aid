class AddRecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            nextVisit: '',
            diagnosis: '',
            prescription: '',
            bill: '',
            notes: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, phoneNumber, nextVisit, diagnosis, prescription, bill, notes } = this.state;
        if (!name || !diagnosis || !prescription || !bill) {
            alert('Please fill in all required fields: Name, Diagnosis, Prescription, Bill');
            return;
        }
        const newRecord = {
            name,
            phoneNumber,
            nextVisit,
            diagnosis,
            prescription,
            bill,
            notes
        };
        this.props.onAddRecord(newRecord);
        this.setState({
            name: '',
            phoneNumber: '',
            nextVisit: '',
            diagnosis: '',
            prescription: '',
            bill: '',
            notes: ''
        });
    }

    render() {
        return (
            <form className="add-form" onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Next Visit:
                    <input
                        type="date"
                        name="nextVisit"
                        value={this.state.nextVisit}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Diagnosis:
                    <input
                        type="text"
                        name="diagnosis"
                        value={this.state.diagnosis}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <label>
                    Prescription:
                    <textarea
                        name="prescription"
                        value={this.state.prescription}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <label>
                    Bill:
                    <input
                        type="text"
                        name="bill"
                        value={this.state.bill}
                        onChange={this.handleInputChange}
                        required
                    />
                </label>
                <label>
                    Notes:
                    <textarea
                        name="notes"
                        value={this.state.notes}
                        onChange={this.handleInputChange}
                    />
                </label>
                <button type="submit">Save Record</button>
            </form>
        );
    }
}

class DoctorRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            enlargedRecord: null
        };
    }

    handleAddRecord = (newRecord) => {
        this.setState((prevState) => ({
            records: [...prevState.records, newRecord]
        }));
    }

    handleDeleteRecord = (index) => {
        this.setState((prevState) => ({
            records: prevState.records.filter((record, i) => i !== index)
        }));
    }

    handleViewRecord = (record) => {
        this.setState({ enlargedRecord: record });
    }

    handleCloseEnlarge = () => {
        this.setState({ enlargedRecord: null });
    }

    render() {
        const { records, enlargedRecord } = this.state;
        return (
            <div className="container">
                <h2>Doctor Records</h2>
                <AddRecordForm onAddRecord={this.handleAddRecord} />
                {enlargedRecord && (
                    <div className="enlarged" onClick={this.handleCloseEnlarge}>
                        <div>
                            <h3>{enlargedRecord.name}</h3>
                            <p><strong>Phone Number:</strong> {enlargedRecord.phoneNumber}</p>
                            <p><strong>Next Visit:</strong> {enlargedRecord.nextVisit}</p>
                            <p><strong>Diagnosis:</strong> {enlargedRecord.diagnosis}</p>
                            <p><strong>Prescription:</strong> {enlargedRecord.prescription}</p>
                            <p><strong>Bill:</strong> {enlargedRecord.bill}</p>
                            <p><strong>Notes:</strong> {enlargedRecord.notes}</p>
                        </div>
                    </div>
                )}
                {records.map((record, index) => (
                    <div className="record" key={index} onClick={() => this.handleViewRecord(record)}>
                        <img src="record.jpg" alt={`Record ${index + 1}`} />
                        <div className="actions">
                            <button onClick={(event) => { event.stopPropagation(); this.handleViewRecord(record); }}>View</button>
                            <button onClick={(event) => { event.stopPropagation(); this.handleDeleteRecord(index); }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

ReactDOM.render(<DoctorRecords />, document.getElementById('root'));