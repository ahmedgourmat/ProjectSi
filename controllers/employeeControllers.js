const Employee = require('../models/employeeSchema')
const Center = require('../models/centerSchema')


const getEmployee = async (req, res) => {
    try {
      const employee = await Employee.find();
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

        const center = await Center.findOne({codeCt})
        if(!center){
            throw Error('there is no center with this code')
        }

        const employee = await Employee.findOne({codeE})

        if(employee){
            throw Error('there is already a Employee with this codeE')
        }

      const data = await Employee.create({codeE,prenomE , nomE ,adrE ,telE , salaire , codeCt})
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



const updateEmployee = async(req,res)=>{
    const {codeE} = req.params
    const {prenomE , nomE ,adrE ,telE , salaire ,codeCt} = req.body

    try {
        const employee = await Employee.findOneAndUpdate({codeE} ,{prenomE , nomE ,adrE ,telE , salaire , codeCt})
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