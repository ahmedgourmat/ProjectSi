const Employee = require('../models/employeeSchema')
const Center = require('../models/centerSchema')


const getEmployee = async (req, res) => {

    const codeCt = req.user.codeCt

    try {
      const employee = await Employee.find({codeCt})
      if(employee){
        res.status(200).json(employee);
      }else {
        throw Error('there is no Employee')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postEmployee = async (req, res) => {
    const {codeE,prenomE , nomE ,adrE ,telE , salaire , codeCt} = req.body
  
    try {

        const employee = await Employee.findOne({codeE})

        if(employee){
            throw Error('there is already a Employee with this codeE')
        }
        const massrouf = 0

      const data = await Employee.create({codeE,prenomE , nomE ,adrE ,telE , salaire , codeCt , massrouf})
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneEmployee = async(req,res)=>{
    const {codeE} = req.params

    try {
        const employee = await Employee.findOne({codeE})
        // console.log(employee)
        if(employee){
            res.status(200).json(employee)
        }else{
            throw Error('There is no Employee with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateEmployee = async (req, res) => {
    const { codeE } = req.params;
    let { prenomE, nomE, adrE, telE, salaire, massrouf } = req.body;

    try {
        // Find the existing employee data in the database
        const data = await Employee.findOne({ codeE });

        // Update only the fields that are provided in the request body
        const updatedFields = {
            prenomE: prenomE || data.prenomE,
            nomE: nomE || data.nomE,
            adrE: adrE || data.adrE,
            telE: telE || data.telE,
            salaire: salaire || data.salaire,
            // Check if massrouf is provided, if not, use the existing value
            massrouf: massrouf !== undefined ? massrouf : data.massrouf,
        };

        // If massrouf is provided, update salaire accordingly
        if (massrouf !== undefined) {
            
            updatedFields.salaire = data.salaire - massrouf;
            updatedFields.massrouf = data.massrouf + massrouf
        }

        // Update the employee in the database
        const employee = await Employee.findOneAndUpdate({ codeE }, updatedFields, { new: true });

        if (employee) {
            res.status(200).json(employee);
        } else {
            throw new Error('There is no Employee with this code');
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};



const deleteEmployee = async(req,res)=>{
    const {codeE} = req.params

    try {
        const employee = await Employee.findOneAndDelete({codeE})
        // console.log(employee)
        if(employee){
            res.status(200).json(employee)
        }else{
            throw Error('There is no Employee with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getEmployee , postEmployee , oneEmployee , updateEmployee , deleteEmployee}