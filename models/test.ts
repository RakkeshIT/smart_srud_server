import { Schema, models, model } from "mongoose";

interface TestProps {
    name: string;
}

const TestSchema = new Schema<TestProps>({
    name: {type: String, required: true},
})

const Test = models.Test || model<TestProps>('Test', TestSchema);

export default Test;    