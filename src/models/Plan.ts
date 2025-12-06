import mongoose,{Document,Mongoose,Schema} from "mongoose";

export type planStatus = "PENDING"|"APPROVED"|"REJECTED";

export interface IPlan extends Document{
    user:mongoose.Types.ObjectId;
    title:string;
    description:string;
    exercises:string[];
    status:planStatus;
}

const planSchema = new Schema<IPlan>(
    {
        user:{type:Schema.Types.ObjectId,ref:"User",required:true},
        title:{type:String, required:true},
         description:{type:String, required:true},
          exercises:{type:[String], required:true},
         status:{type:String,
             enum:["PENDING","APPROVED","REJECTED"],
            default:"PENDING"
            }
        },{timestamps:true}
    );

export default mongoose.model<IPlan>("Plan",planSchema);    