
const Students = require('../models/Students')

exports.createStudent =   async (req,res)=>{
try{
 const student =  await Students.create(req.body)
 res.status(200).json({sucess: true,student})

}catch(err){
res.status(500).json({sucess:false, err})
}

}

//READ

exports.readall =  async (req,res)=>{
try{
const student = await Students.find();
res.status(200).json({sucess:true, student})
}catch(err){
res.status(500).json({sucess:false, err})
}

}

//read by id
exports.readbyid = async (req,res)=>{

    try{
        const {id} = req.params
        const student =  await Students.findById(id)
        res.status(200).json(student)

    }catch(err){
res.status(500).json({sucess:false, err})
    }
}




//update by id 
exports.updatebyid =  async (req,res)=>{
try{
 const {id} = req.params
 const student = await Students.findByIdAndUpdate(id, req.body, {new: true})
 res.status(200).json(student)

}catch(err){
res.status(500).json({sucess:false, err})
}
}

//deleteby id

exports.deletebyid = async (req,res)=>{
try{

   const {id} = req.params
   const student = await Students.findByIdAndDelete(id)
   res.status(200).send("data deleted")

}catch(err){
res.status(500).json({sucess:false, err})
}
}