import { type } from "arktype";

import type { Result } from "@utils/result";
import { BookingSlotsSchema, type BookingSlots } from "./api.types";

type FetchAvailableBookingSlotsError =
  | "ErrorMissingConfigApiUrl"
  | "ErrorRequestFailedAspUrl"
  | "ErrorInvalidResponseAspUrl"
  | "ErrorUnknownAspUrl";

function returnError() {
    return {
      ok: false,
      error: "ErrorMissingConfigApiUrl",
    };
}

export const fetchAvailableBookingSlots = async (): Promise<
  Result<BookingSlots, FetchAvailableBookingSlotsError>
> => {
  const url = process.env.ASP_URL;

  if (!url) {
    return returnError();
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return returnError();
    }

    const json = await response.json();
    const result = BookingSlotsSchema(json);

    if (!result instanceof type.errors) {
      return { ok: true, data: result };
    }
    
    return returnError();

  } catch (error) {
    return returnError();
  }
};
