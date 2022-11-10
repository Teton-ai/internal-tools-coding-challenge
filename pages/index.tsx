import Head from "next/head";
import { useEffect, useState } from "react";
import { PatientEventType, ReviewDataType } from "../helpers/types";
import tailwindColorToHex from "../helpers/tailwindColorToHex";
import * as R from "ramda";

const ACTION_TO_TAILWIND_COLOR_MAP = {
    laying_in_bed: "bg-sky-200",
    sitting_in_bed: "bg-sky-300",
    sitting_on_bed_edge: "bg-sky-500",
    sitting_in_chair: "bg-amber-300",
    standing_on_floor: "bg-orange-400",
    sitting_on_floor: "bg-pink-400",
    laying_on_floor: "bg-rose-500",
    out_of_view_bathroom: "bg-violet-300",
    out_of_view: "bg-violet-500",
    unknown: "bg-gray-400",

    sitting_in_lift: "bg-gray-400",
    sitting_in_walker: "bg-gray-400",
    walking_with_walking_aid: "bg-gray-400",
};

const SLIDER_EMOJIS = ["😖", "😞", "😐", "🙂", "🥳"];

function PatientEventTimeline(props: {
    events: PatientEventType[];
    dbMeta: {
        from: string;
        to: string;
        reviewSince: string;
    };
}) {
    // NOTE: events must be filtered, to only include events for a single patient/bed/serial_number
    const { events, dbMeta } = props;

    const nightStart = new Date(dbMeta.from);
    const nightEnd = new Date(dbMeta.to);
    const nightDuration = nightEnd.getTime() - nightStart.getTime();

    // first sort the events
    const sortedEvents = events.slice().sort((a, b) => {
        return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
    });
    const processedEvents: {
        id: number;
        bed: number;
        serial_number: string;
        timestamp: string;
        department: number;
        type: string;

        nightFractionEnd: number;
        nightFractionStart: number;
        z: number;
    }[] = sortedEvents.map((e, i) => {
        const start = new Date(e.timestamp);
        const end =
            i === events.length - 1
                ? nightEnd
                : new Date(events[i + 1].timestamp);
        const nightFractionStart = Math.max(
            0,
            (start.getTime() - nightStart.getTime()) / nightDuration
        );
        const nightFractionEnd = Math.min(
            1,
            (end.getTime() - nightStart.getTime()) / nightDuration
        );
        const z = e.type === "laying_in_bed" ? 0 : 1;
        return { ...e, nightFractionStart, nightFractionEnd, z };
    });

    return (
        <div className="border border-patagonia overflow-hidden rounded h-5 mt-1 mb-1">
            <svg
                width={"100%"}
                height={"100%"}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {processedEvents
                    .sort((a, b) => a.z - b.z)
                    .map((item, index) => {
                        return (
                            <rect
                                key={index}
                                x={item.nightFractionStart * 100}
                                width={
                                    (item.nightFractionEnd -
                                        item.nightFractionStart) *
                                    100
                                }
                                height={100}
                                fill={tailwindColorToHex(
                                    ACTION_TO_TAILWIND_COLOR_MAP[item.type]
                                )}
                            />
                        );
                    })}
            </svg>
        </div>
    );
}

export default function Review() {
    return (
        <div>
            <Head>
                <title>Review</title>
            </Head>
            <div className="flex flex-col bg-gray-100 min-h-screen"></div>
        </div>
    );
}
