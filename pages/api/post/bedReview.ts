// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BedReviewType } from "../../../helpers/types";
import * as fsPromises from "fs/promises";
import * as path from "path";

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const {
        bed,
        date,
        review_username,
        general_value,
        bednet,
        fallnet,
        logic,
        notes,
    } = req.body;
    if (
        typeof bed !== "number" ||
        typeof date !== "string" ||
        typeof review_username !== "string" ||
        typeof general_value !== "number" ||
        typeof bednet !== "number" ||
        typeof fallnet !== "number" ||
        typeof logic !== "number" ||
        typeof notes !== "string"
    ) {
        return res.status(400).end();
    }

    const newBedReview: BedReviewType = {
        bed,
        review_username,
        general_value,
        bednet,
        fallnet,
        logic,
        notes,
        date,
        id: Date.now(), // didn't wanna make an id counter, so just use the current time
        modified_on: new Date().toISOString(),
        created_on: new Date().toISOString(),
        department: 3,
    };

    // TODO: put in a "challenger's todo" here; don't code this for the interviewee
    const prevData = JSON.parse(
        (
            await fsPromises.readFile(path.join(process.cwd(), "data.json"))
        ).toString()
    );
    const newData = {
        ...prevData,
        bed_reviews: prevData.bed_reviews
            .filter((review) => !(review.bed === bed && review.date === date))
            .concat(newBedReview),
    };
    await fsPromises.writeFile(
        path.join(process.cwd(), "data.json"),
        JSON.stringify(newData)
    );

    res.status(200).json(newBedReview);
};
