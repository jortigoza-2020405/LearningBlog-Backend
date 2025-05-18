//Validar los errores 
import { validationResult } from "express-validator"; //Captura los resultados de las validaciones


//Imagenes
export const validateErrors = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //return res.status(400).send(errors.array());
        return next(errors);
    }
    next();
}

//Cuando no hay imagenes
export const validateErrorWithoutImg = (req, res, next)=>{
    const errors = validationResult(req)
   
    if (!errors.isEmpty()){
        return res.status(400).send(
            {
                success: false,
                message: 'Validation errors',
                errors: errors.errors
            }
        )
    }
    next()
}


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};