// Conexión a la BD

import mongoose from "mongoose";

export const connect = async()=>{
    try {
        mongoose.connection.on('error',()=>{
            console.log('MongoDB | Could not be connect to mongodb')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | Try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected mongodb')
        })
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconnected')
        })
        
        //Conectarse a la BD
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50, // Max de conexiones
                serverSelectionTimeoutMS: 5000 // Tiempo
            }
        )

    } catch (err) {
        console.error('Database connection failed', err)
    }
}