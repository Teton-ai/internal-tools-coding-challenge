export type BedReviewType = {
    id: number;
    bed: number;
    date: string;
    auth?: number;
    review_username: string;
    general_value: number | null;
    bednet: number | null;
    fallnet: number | null;
    logic: number | null;
    notes: string;
    modified_on: string;
    created_on: string;
    department: number;
};

export type PatientEventType = {
    bed: number;
    serial_number: string | null;
    department: number;
    id: number;
    type: string;
    timestamp: string;
};

export type ReviewDataType = {
    patient_events: PatientEventType[];
    bed_reviews: BedReviewType[];
    meta: {
        from: string;
        to: string;
    };
};
