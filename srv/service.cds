using ust.nikita.pandi.reuse as db from '../db/schema';

service EmployeeService {

    entity EmployeeSet as projection on db.Employee;

}
