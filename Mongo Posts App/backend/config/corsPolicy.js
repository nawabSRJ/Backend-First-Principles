const corsOptions = {
    origin:['http://localhost:5173'],
    credentials:true,
    optionsSuccessStatus:200,
    methods:['POST','GET','PUT','PATCH','DELETE'],
    allowedHeaders: "Content-Type,Authorization"
};

export default corsOptions;
