import mongoose, {Schema} from "mongoose"

const MODEL_NAME = "Headphone"

const schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: false
    },
    qty: {
        type: Number,
        required: false
    }
},
{
    timestamps: true
}
)

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "headphones")