import { inject, observer } from "mobx-react";
import React from "react";
import { Employee, Root } from "../mst";

interface EmployerComponentProps {
  rootTree?: Root;
}


interface EmployerComponentState {
  employeeName: string;
  hours_worked: string;
  showDetails?: any;
  query?: any;
}

@inject("rootTree") /*** inject will inject this rootTree in our component */
@observer /*** observ the changes occured in rootTree */

class EmployerComponent extends React.Component<EmployerComponentProps,EmployerComponentState> {

  constructor(props: EmployerComponentProps) {
    super(props);

    this.state = {
      employeeName: "",
      hours_worked: "",
      showDetails: {
        employeeName: "",
        hours_worked: ""
      },
      query: ''
    };
  }

  handleAdd = (e: any) => {
    e.preventDefault();
    const { employeeName, hours_worked } = this.state;

    const { rootTree } = this.props;

    if (!rootTree) return null;

    /*** Action which change the state */
    rootTree.employer.newEmployee(employeeName, +hours_worked); /*** + before hours_worked convert it into integer */

    this.setState((prevState) => {
      return {
        ...prevState,
        employeeName: "",
        hours_worked: "",
      };
    });
  };

  handleUpdate = (e: any) => {
    e.preventDefault();

    const {showDetails} = this.state;

    // const {rootTree}
    // const data = this.props.rootTree?.employer.employee.filter(e => e.id === showDetails.id)[0];
    this.props.rootTree?.employer.edit_employee(showDetails.id,showDetails.employeeName, +showDetails.hours_worked);
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;

    this.setState((prevSate) => {
      return {
        ...prevSate,
        [name]: value,
      };
    });
  };

  handleEditChange = (e: any) => {
    const { name, value } = e.target;

    this.setState((prevSate) => {
      return {
        ...prevSate,
        showDetails: {
          ...prevSate.showDetails,
          [name]: value,
        }
      };
    });
  };

  handleClick = (details: Employee) => {
    this.setState((prevState) => {
      const {name, hours_worked, id} = details
      return {
        ...prevState,
        showDetails: {employeeName: name, hours_worked, id},
      };
    });
  };

  componentDidMount(){
    const {rootTree} = this.props

    if(!rootTree) return null

    rootTree.employer.loadEmployees()
  }

  render() {
    const { rootTree } = this.props;
    const { employeeName, hours_worked, query, showDetails } = this.state;

    if (!rootTree) return null;

    const num_employees = rootTree.employer.num_employees
    const filterd_employees = rootTree.employer.filtered_employees(query) 
    return (
      <div className="employer">
        <div className="employer__form">
          <div>
            <div>
              <h3>Add Employee</h3>
              <form onSubmit={this.handleAdd}>
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={employeeName}
                  name="employeeName"
                  placeholder="Name of employee"
                />
                <br />
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={hours_worked}
                  name="hours_worked"
                  placeholder="hours worked"
                />
                <br />
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={query}
                  name="query"
                  placeholder="Search Employee"
                />
                <br />
                <button type="submit">Add</button>
              </form>
            </div>

            <div>
              <h3>Update Employee</h3>
              <form onSubmit={this.handleUpdate}>
                  <input
                    type="text"
                    onChange={this.handleEditChange}
                    value={showDetails.employeeName}
                    name="employeeName"
                    placeholder="Name of employee"
                  />
                  <br />
                  <input
                    type="text"
                    onChange={this.handleEditChange}
                    value={showDetails.hours_worked}
                    name="hours_worked"
                    placeholder="hours worked"
                  />
                  <br />
                  <button type="submit">Update</button>
              </form>
            </div>
          </div>

          <div className="employer__details">
            <div className="employer__details-single">
              <h2>Comapany Name: {rootTree.employer.name}</h2>
              <h3>Location: {rootTree.employer.location}</h3>
              <p>Total Employees: {num_employees}</p>
            </div>
          </div>

        </div>

        <div className="employer__list">
          <>
            {rootTree.employer.employee.length === 0 ? (
              <h2>No Data</h2>
            ) : (
              filterd_employees.map((employee) => (
                <div
                  className="employer__list-single"
                  
                  key={employee.id}
                >
                  <h1 onClick={() => this.handleClick(employee)}>Name: {employee.name}</h1>
                  <h3>Hours Work: {employee.hours_worked}Hr</h3>
                  <button onClick={() => rootTree.employer.delete_employee(employee.id)}>Remove Employee</button>
                </div>
              ))
            )}
          </>
        </div>
      </div>
    );
  }
}

export default EmployerComponent;
