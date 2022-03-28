import axios from "axios";
import { applySnapshot, destroy, flow, getParent, Instance, onSnapshot, types } from "mobx-state-tree";
import { v4 as uuidv4 } from 'uuid'


const EmployeeModal = types.model("Employee", {
    id: types.identifier,
    name: types.string,
    hours_worked: types.number
})
/*** 
 * Deeplevel Actions 
    const edit_employee = flow(function* (name: string, hours_worked: number): any{
        try{
            const {data} = yield axios.patch(`http://localhost:3001/employee/${self.id}`, {name, hours_worked})
            // console.log("self", self.name);
            applySnapshot(self, data)
        }catch(error){
            console.log('update error', error);
        }
    })

    
    onSnapshot(self, (snapshot) => console.log('employee modal', snapshot))
*/

const EmployerModal = types.model("Employer", {
    id: types.optional(types.identifier, ""),
    name: types.optional(types.string, ''),
    location: types.optional(types.string, ''),
    employee: types.array(EmployeeModal)
}).actions(self => {
    /*** What is Self?
     * self is representation of this EmployerModal insatance
     */

    // action function which only responsible to change the state or mutate the state
    const newEmployee = flow(function* (name: string, hours_worked: number): any{
        try{
            const id = uuidv4();
            const {data} = yield axios.post('http://localhost:3001/employee', {id, name, hours_worked});
            self.employee.push(data)
            /*** we change the state using snap shot there is another way by mutating the state */
            // applySnapshot(self, {...self, employee: [{id, name, hours_worked}, ...self.employee]})
        }catch(error){
            console.log('error', error);
        }
    })

    const edit_employee = flow(function* (id: string, name: string, hours_worked: number): any{
        try{
            const {data} = yield axios.patch(`http://localhost:3001/employee/${id}`, {name, hours_worked})
            const update = self.employee
            const indexOfUpdate  =  self.employee.findIndex(emp => emp.id === data.id)
            update[indexOfUpdate] = data
            applySnapshot(self, {...self, employee: [...update]})
        }catch(error){
            console.log('update error', error);
        }
    })
    const delete_employee = flow(function* (id: string) {
        try{
            yield axios.delete(`http://localhost:3001/employee/${id}`)
            const d = self.employee.findIndex(s => s.id === id)
            destroy(self.employee[d])
            // applySnapshot(self, {...self, employee: self.employee.splice(d, 1)})
        }catch(error){
            console.log('error while delete_employee', error);
        }
    })
    /** fetching data from endpoints */
    const loadEmployees = flow(function* (){
        try{
            console.log('load is called');
            const {data} = yield axios.get('http://localhost:3001/employee')
            self.employee = data
            // applySnapshot(self, {...self, employee: [...self.employee, ...data]})
        }catch(error){
            console.log('error: ', error)
        }
    })
    function afterCreate(){
        onSnapshot(self, () => loadEmployees())
    }

    return { newEmployee, loadEmployees, afterCreate, edit_employee, delete_employee }
}).views(self => ({

    /** Inbuilt memoization which improve the performance
     * but there is gotcha if you pass the parameter in that function that it looses the momiazation 
     * when you pass the parameter in that function then no need to write the get 
     * Example is filtered_employees
     */
    get num_employees(){
        
        return self.employee.length
    },
    /** search functionality */
    filtered_employees(query: string){
        return self.employee.filter(emp => emp.name.includes(query))
    },

    employeeById(id: string){
        return self.employee.filter(emp => emp.id === id)[0]
    }
}))

const RootModal = types.model("Root", {
    employer: EmployerModal
})

export { RootModal }

export type Root = Instance<typeof RootModal>
export type Employer = Instance<typeof EmployerModal>
export type Employee = Instance<typeof EmployeeModal>