import { ReviewDataType } from "../../../helpers/types";
import * as fsPromises from "fs/promises";
import * as path from "path";

export default async (req, res) => {
    const responseJson: ReviewDataType = JSON.parse(
        (
            await fsPromises.readFile(path.join(process.cwd(), "data.json"))
        ).toString()
    );

    res.status(200).json(responseJson);
};
