//import thu vien-------------------------------------------------
const express=require('express');
const mongoose=require('mongoose');
//tao doi tuong moi cho express
const app=express();
app.set('view engine','ejs');
//ket noi voi csdl mongodb----------------------------------------------
mongoose.connect('mongodb+srv://senpai6868:Dung04012004@cluster0.cayz0x7.mongodb.net/db1',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Kết nối thành công với MongoDB");
}).catch((err) => {
    console.error("Lỗi kết nối với MongoDB:", err);
});
//truy van csdl---------------------------------------------------
//chon csdl thao tac
const db1=mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema=new mongoose.Schema({
    id:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
});
//anh xa model vao bang du lieu
const SinhVien=db1.model('sinhviens',SinhVienSchema);
//tao link trieu goi tren trinh duyet (API)
app.get('/SinhVien',async (req,res)=>{
    try {
        const sinhviens = await SinhVien.find();//lay ve toan bo sinh vien
        //tra ve file ejs
        res.render('students',{sinhviens: sinhviens});//render du lieu
        console.log(sinhviens);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Doc du lieu loi"});
    }
});

//khoi chay may chu------------------------------------------------------------
const PORT=process.env.PORT|| 3001;
app.listen(PORT,()=>{
console.log('server dang chay o cong 3001');
});
module.exports=app;