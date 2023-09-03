import mongoose from 'mongoose';

const connectToDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://wendeawano90:94VmKHgwUrFPIc1s@cluster0.ebinkkq.mongodb.net/');

        console.log('mongodb is connected')


    } catch (e) {
        console.log(e);
    }
}

export default connectToDB;



