// Mongoose
/**
 * Mongoose es una biblioteca de Node.js que proporciona una solución elegante y práctica para trabajar con MongoDB, una base de datos NoSQL. 
 * Es un Object Data Modeling (ODM) library, lo que significa que te permite definir esquemas y modelos para tus datos, 
 * facilitando las operaciones de lectura y escritura en la base de datos. 
 */

import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect to MongoDB");
    }
};

async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect to MongoDB");
    }
};

export {connectToDatabase, disconnectToDatabase };